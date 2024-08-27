import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { logInfo } from 'src/app_log';
import { Card, CardDto, CardStatusEnum } from 'src/typeorm/card.entity';
import { CreateUserDto, UserDto } from 'src/typeorm/user.entity';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { Repository } from 'typeorm';
import { ExcelService } from '../excel/excel.service';
import {
  AllocationStatusEnum,
  CardAllocationDto,
} from 'src/typeorm/card_allocation.entity';
import { BaseResponse } from 'src/typeorm/response_base';
import { CardAllocationService } from '../card_allocation/card_allocation.service';
import { EntityProviderEnum } from 'src/typeorm/entity_provider_enum';

@Injectable()
export class CardService {
  constructor(
    @Inject(EntityProviderEnum.CARD) private repos: Repository<Card>,
    private excel: ExcelService,
    private cardAllocationService: CardAllocationService,
  ) {}
  create({ by, body }: { by: CreateUserDto; body: CardDto }) {
    return this.repos
      .save(
        this.repos.create({
          ...body,
          parentId: by.parentId,
          details: { byId: by.id },
        }),
      )
      .then((value) => {
        if (value) throw new WsMessage(HttpExceptionCode.SUCCEEDED);
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      })
      .catch((err) => {
        if (err instanceof WsMessage) throw err;
        console.log(err);
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }

  async createBulk({
    by,
    path,
    body,
  }: {
    by: CreateUserDto;
    path: string;
    body: CardAllocationDto;
  }) {
    const data =
      await this.excel.readExcel<
        { pan: string; uid: string; 'Numéro de série': string }[]
      >(path);
    console.log(data);
    console.log(data);
    let card: Card[];
    await this.repos.manager.transaction(async (manager) => {
      await Promise.all(
        data.map((e) => {
          return manager
            .save(
              Card,
              manager.create(Card, {
                serial: e['Numéro de série'],
                uid: e.uid,
                pan: e.pan,
                parentId: by.parentId,
                details: { byId: by.id },
              }),
            )
            .then((value) => {
              if (value) {
                return value;
              }
              throw new WsMessage(HttpExceptionCode.FAILLURE);
            })
            .catch((err) => {
              console.log(err);
              if (err instanceof WsMessage) throw err;
              console.log(err);
              throw new WsMessage({
                ...HttpExceptionCode.FAILLURE,
                message: `ligne serial= ${e['Numéro de série']} pan=${e.pan} `,
              });
            });
        }),
      )
        .then((value) => {
          if (value) {
            card = value;
          } else throw new WsMessage(HttpExceptionCode.FAILLURE);
        })
        .catch((err) => {
          if (err instanceof WsMessage) throw err;
          console.log(err);
          throw new WsMessage(HttpExceptionCode.FAILLURE);
        });
    });
    return this.cardAllocationService
      .cardEmission({
        by,
        body: {
          label: body.label,
          motif: body.motif,
          senderId: null,
          quantity: body.quantity,
          rejectionMotif: null,
          status: AllocationStatusEnum.accepted,
          receiverId: by.parentId,
          startSerial: body.startSerial,
          endSerial: body.endSerial,
        },
        cardIds: card.map((e) => e.id),
      })
      .then((allocResult) => {
        if (allocResult) return HttpExceptionCode.SUCCEEDED;
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }
  getAvailableCard({ quantity, by }: { quantity: number; by: UserDto }) {
    return this.repos
      .find({
        where: {
          parentId: by.parentId,
          status: CardStatusEnum.readyForAllocation,
        },
        take: quantity,
      })
      .then((result) => {
        if (result.length == quantity) return BaseResponse.success(result);
        throw new WsMessage(HttpExceptionCode.INSUFFISANT_QUANTITY);
      });
  }
  getAll({ by }: { by: CreateUserDto }) {
    logInfo({ by, action: 'Get Card details' });
    return this.repos
      .find({ where: { parentId: by.parentId } })
      .then((value) => {
        if (value) return BaseResponse.success(value);
      })
      .catch((err) => {
        if (err) throw err;
        console.log(err);
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }
}
