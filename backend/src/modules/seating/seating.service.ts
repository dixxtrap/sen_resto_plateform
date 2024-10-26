import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { EntityProviderEnum } from 'src/typeorm/entity_provider_enum';
import { BaseResponse } from 'src/typeorm/response_base';
import { Seating, SeatingDto } from 'src/typeorm/seating.entity';
import { UserDto } from 'src/typeorm/user.entity';
import { WsCatch } from 'src/utils/catch';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { Repository } from 'typeorm/repository/Repository';
@Injectable()
export class SeatingService {
  constructor(
    @Inject(EntityProviderEnum.SEATING) private repos: Repository<Seating>,
  ) {}

  create({ by, body }: { by: UserDto; body: SeatingDto }) {
    return this.repos
      .save(
        this.repos.create({
          ...body,
          partnerId: by.parentId,
          details: { byId: by.id },
        }),
      )
      .then((result) => {
        if (result) throw new WsMessage(HttpExceptionCode.SUCCEEDED);
        throw new Error();
      })
      .catch(WsCatch);
  }

  update({ by, id, body }: { by: UserDto; id: number; body: SeatingDto }) {
    return this.repos
      .update({ id }, this.repos.create({ ...body, partnerId: by.parentId }))
      .then((result) => {
        if (result) throw new WsMessage(HttpExceptionCode.SUCCEEDED);
        throw new Error();
      })
      .catch(WsCatch);
  }
  getAll({ by }: { by: UserDto }) {
    return this.repos
      .find({
        where: { partnerId: by.parentId },
        order: { details: { createdAt: 'DESC' } },
      })
      .then((result) => BaseResponse.success(result))
      .catch(WsCatch);
  }
}
