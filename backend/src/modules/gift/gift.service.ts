import { Repository } from 'typeorm/repository/Repository';

import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Gift, GiftDto } from 'src/typeorm/gift.entity';
import { GiftHistory } from 'src/typeorm/gift_history.entity';
import { UserDto } from 'src/typeorm/user.entity';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { WsCatch } from 'src/utils/catch';
import { BaseResponse } from 'src/typeorm/response_base';
import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
import { EntityProviderEnum } from 'src/typeorm/entity_provider_enum';

export class GiftService {
  constructor(
    @Inject(EntityProviderEnum.GIFT) private repos: Repository<Gift>,
    @Inject(EntityProviderEnum.GIFT_HISTORY)
    private reposHistory: Repository<GiftHistory>,
  ) {}
  create({ by, body }: { by: UserDto; body: GiftDto }) {
    return this.repos
      .findOne({
        where: [
          { partnerId: by.parentId },
          { partner: { parentId: by.parentId } },
        ],
      })
      .then((old) => {
        if (old) {
          return this.repos
            .update({ id: old.id }, { ...body, byId:by.id })
            .then((result) => {
              if (result) {
                if (
                  body.discount !== old.discount
                ) {
                  return this.reposHistory
                    .save(this.repos.create({ ...body,  partnerId: by.parentId , byId:by.id }))
                    .then(() => {
                      throw new WsMessage(HttpExceptionCode.SUCCEEDED);
                    });
                } else throw new WsMessage(HttpExceptionCode.SUCCEEDED);
              }
            });
        } else {
          return this.repos
            .save(this.repos.create({ ...body ,partnerId: by.parentId, byId:by.id }))
            .then((result) => {
              if (result) {
                return this.reposHistory
                  .save(
                    this.reposHistory.create({ ...body, partnerId: by.parentId}),
                  )
                  .then(() => {
                    throw new WsMessage(HttpExceptionCode.SUCCEEDED);
                  });
              }
            });
        }
      })
      .catch(WsCatch);
  }

  getAll({ by }: { by: UserDto }) {
    return this.repos
      .findOne({ where: { partnerId: by.parentId }, relations:{history:{by:true}} })
      .then((result) => BaseResponse.success(result));
  }
}
