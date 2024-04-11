import { InjectRepository } from '@nestjs/typeorm';
import { Card, CardStatusEnum } from 'src/typeorm/card.entity';
import {
  AllocationStatusEnum,
  CardAllocation,
  CardAllocationDto,
} from 'src/typeorm/card_allocation.entity';
import { CardAllocationDetails } from 'src/typeorm/card_allocation_details.entity';
import { BaseResponse } from 'src/typeorm/response_base';
import { UserDto } from 'src/typeorm/user.entity';
import { WsCatch } from 'src/utils/catch';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { Repository, In } from 'typeorm';
import { cardAllocDetailsSelect } from './queries/select';

export class CardAllocationService {
  constructor(
    @InjectRepository(CardAllocation) private repos: Repository<CardAllocation>,
    @InjectRepository(CardAllocationDetails)
    private reposCardDetail: Repository<CardAllocationDetails>,
    @InjectRepository(Card)
    private reposCard: Repository<Card>,
  ) {}
  cardEmission({
    body,
    by,
    cardIds,
  }: {
    body: CardAllocationDto;
    by: UserDto;
    cardIds?: number[];
  }) {
    return this.repos
      .save(
        this.repos.create({
          ...body,
          senderId: null,
          receiverId: by.id,
          details: { byId: by.id },
        }),
      )
      .then((value) => {
        if (value) {
          if (cardIds) {
            const details = cardIds.map((e) =>
              this.reposCardDetail.create({
                cardAllocationId: value.id,
                cardId: e,
              }),
            );
            return this.reposCardDetail.save(details).then((detailResult) => {
              if (detailResult) return value;
              else throw new WsMessage(HttpExceptionCode.FAILLURE);
            });
          } else return value;
        } else throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }

  getCardAllocationDetails({ by, id }: { by: UserDto; id: number }) {
    return this.repos
      .findOne({
        where: { id },
        relations: { card: true, acceptedBy: true, details: { by: true } },
        select: cardAllocDetailsSelect,
      })
      .then((result) => BaseResponse.success(result));
  }
  async create({
    body,
    by,
  }: {
    body: CardAllocationDto;
    by: UserDto;
    cardIds?: number[];
  }) {
    try {
      let allocation: CardAllocation;
      let cardIds: number[];
      await this.getAvailableCard({ by, quantity: body.quantity }).then(
        async (availableCardResult) => {
          cardIds = availableCardResult.data.map((e) => e.id);
          await this.repos.manager.transaction((manager) => {
            return manager
              .save(
                CardAllocation,
                manager.create(CardAllocation, {
                  ...body,
                  startSerial: availableCardResult.data[0].serial,
                  endSerial: availableCardResult.data[body.quantity - 1].serial,
                  senderId: by.id,
                  details: { byId: by.id },
                }),
              )
              .then((cardAllocationResult) => {
                if (cardAllocationResult) {
                  return this.reposCard
                    .update(
                      { id: In(cardIds) },
                      { status: CardStatusEnum.pending },
                    )
                    .then((updateStatusResult) => {
                      if (updateStatusResult.affected > 0)
                        allocation = cardAllocationResult;
                    });
                } else throw new WsMessage(HttpExceptionCode.FAILLURE);
              });
          });
        },
      );

      return this.reposCardDetail
        .save(
          cardIds.map((e) =>
            this.reposCardDetail.create({
              cardAllocationId: allocation.id,
              cardId: e,
            }),
          ),
        )
        .then((result) => {
          if (result) new WsMessage(HttpExceptionCode.SUCCEEDED);
        });
    } catch (error) {
      WsCatch(error);
    }
  }

  getAvailableCard({ quantity, by }: { quantity: number; by: UserDto }) {
    return this.reposCard
      .find({
        where: {
          parentId: by.parentId,
          status: CardStatusEnum.readyForAllocation,
        },
        take: quantity,
      })
      .then((result) => {
        console.log('data', result);
        if (result.length == quantity)
          return BaseResponse.success(result) as BaseResponse<Card[]>;
        throw new WsMessage(HttpExceptionCode.INSUFFISANT_QUANTITY);
      });
  }
  validate({ body, by }: { body: CardAllocationDto; by: UserDto }) {
    console.log('==============body===========');
    console.log(body);
    return this.repos.manager.transaction((manager) => {
      return manager
        .update(
          CardAllocation,
          { id: body.id },
          {
            status: AllocationStatusEnum.accepted,
            acceptedById: by.id,
            rejectionMotif: body.motif,
          },
        )
        .then((cardAllocationUpdateResult) => {
          if (cardAllocationUpdateResult.affected > 0) {
            return this.reposCardDetail
              .find({ where: { cardAllocationId: body.id } })
              .then((getCardDetailsResult) => {
                console.log(
                  '=============getCardDetailsResult=================',
                );
                console.log(getCardDetailsResult);
                if (getCardDetailsResult.length > 0) {
                  return this.reposCard
                    .update(
                      {
                        id: In(getCardDetailsResult.map((e) => e.cardId)),
                      },
                      {
                        status: CardStatusEnum.readyForAllocation,
                        parentId: by.parentId,
                      },
                    )
                    .then((updateCardResult) => {
                      if (updateCardResult.affected > 0)
                        return HttpExceptionCode.SUCCEEDED;
                      console.log('============ failuren 1==========');
                      throw new WsMessage(HttpExceptionCode.FAILLURE);
                    });
                }
                console.log('============ failuren 2==========');
                throw new WsMessage(HttpExceptionCode.FAILLURE);
              });
          }
          console.log('============ failuren 3==========');
          throw new WsMessage(HttpExceptionCode.NOT_FOUND);
        })
        .catch(WsCatch);
    });
  }
  rejection({ body, by }: { body: CardAllocationDto; by: UserDto }) {
    return this.repos
      .update(
        {
          id: body.id,
        },
        {
          status: AllocationStatusEnum.rejected,
          acceptedById: by.id,
          rejectionMotif: body.motif,
        },
      )
      .then((updateCardAllocationResult) => {
        if (updateCardAllocationResult.affected > 0) {
          return this.reposCardDetail
            .find({ where: { cardAllocationId: body.id } })
            .then((getCardDetailsResult) => {
              console.log('=============getCardDetailsResult=================');
              console.log(getCardDetailsResult);
              if (getCardDetailsResult.length > 0) {
                return this.reposCard
                  .update(
                    {
                      id: In(getCardDetailsResult.map((e) => e.cardId)),
                    },
                    {
                      status: CardStatusEnum.readyForAllocation,
                    },
                  )
                  .then((updateCardResult) => {
                    if (updateCardResult.affected > 0)
                      return HttpExceptionCode.SUCCEEDED;
                    console.log('============ failuren 1==========');
                    throw new WsMessage(HttpExceptionCode.FAILLURE);
                  });
              }
              console.log('============ failuren 2==========');
              throw new WsMessage(HttpExceptionCode.FAILLURE);
            });
        }
        throw new WsMessage(HttpExceptionCode.NOT_FOUND);
      })
      .catch(WsCatch);
  }
  getAll({ by }: { by: UserDto }) {
    return this.repos
      .find({ where: [{ senderId: by.parentId }, { receiverId: by.parentId }] })
      .then((result) => BaseResponse.success(result));
  }
}
