import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { Deliver, DeliverDto } from 'src/typeorm/partner/deliver.entity';
import { EntityProviderEnum } from 'src/typeorm/entity_provider_enum';
import { BaseResponse } from 'src/typeorm/response_base';
import { UserDto } from 'src/typeorm/user.entity';
import { WsCatch } from 'src/utils/catch';
import { CryptoService } from 'src/utils/crypto_service';
import { generateCode } from 'src/utils/generate_code';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class DeliverService {
  constructor(
    @Inject(EntityProviderEnum.DELIVER) private repos: Repository<Deliver>,
  ) {}
  create({ body, by }: { by: UserDto; body: DeliverDto }) {
    return this.repos
      .save(
        this.repos.create({
          ...body,
          companyId: by.companyId,
          password: CryptoService.createHash(generateCode(6)),
        }),
      )
      .then((result) => {
        if (result) return HttpExceptionCode.SUCCEEDED;
        else throw new WsMessage(HttpExceptionCode.FAILLURE);
      })
      .catch((err) => {
        console.log(err);
        if (err instanceof WsMessage) throw err;
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }
  update({ id, body }: { id: number; body: DeliverDto }) {
    console.log(`======================body======================`, body);
    return this.repos
      .update({ id: Equal(id) }, body)
      .then((result) => {
        if (result.affected > 0) return HttpExceptionCode.SUCCEEDED;
        else throw new WsMessage(HttpExceptionCode.FAILLURE);
      })
      .catch((err) => {
        console.log(err);
        if (err instanceof WsMessage) throw err;
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }
  reGenerateCode({ id, by }: { id: number; by: UserDto }) {
    return this.repos
      .update(
        { id, company: [{ id: by.companyId }] },
        { password: CryptoService.createHash(generateCode(6)) },
      )
      .then((result) => {
        if (result.affected > 0)
          throw new WsMessage(HttpExceptionCode.SUCCEEDED);
      })
      .catch(WsCatch);
  }
  getAll({ by }: { by: UserDto }) {
    return this.repos
      .find({
        where: { company: [{ id: by.companyId }] },
      })
      .then((result) => {
        if (result) return BaseResponse.successWithPagination(result, 10, 20);
        else throw new WsMessage(HttpExceptionCode.FAILLURE);
      })
      .catch((err) => {
        console.log(err);
        if (err instanceof WsMessage) throw err;
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }
  getById({ id }: { id: number }) {
    return this.repos
      .findOne({ where: { id: Equal(id) } })
      .then((result) => {
        if (result) return BaseResponse.success(result);
        else throw new WsMessage(HttpExceptionCode.FAILLURE);
      })
      .catch((err) => {
        console.log(err);
        if (err instanceof WsMessage) throw err;
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }
}
