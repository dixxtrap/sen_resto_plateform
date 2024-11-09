import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { Customer, CustomerDto } from 'src/typeorm/partner/customer.entity';
import { EntityProviderEnum } from 'src/typeorm/entity_provider_enum';
import { BaseResponse } from 'src/typeorm/response_base';
import { WsCatch } from 'src/utils/catch';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { Equal, Repository } from 'typeorm';
import { PartnerService } from '../partner.service';
import { PartnerEnum } from 'src/enum/partner.enum';

@Injectable()
export class CustomerService {
  constructor(
    @Inject(EntityProviderEnum.CUSTOMER) private repos: Repository<Customer>,
    private partner: PartnerService,
  ) {}
  create({ body }: { body: CustomerDto }) {
    return this.repos
      .save(this.repos.create(body))
      .then(async (result) => {
        if (result) {
          const partner = await this.partner.create({
            body: { partnerId: result.id, type: PartnerEnum.company },
          });
          await this.repos.update({ id: result.id }, { partnerId: partner.id });
          throw new WsMessage(HttpExceptionCode.SUCCEEDED);
        } else throw new WsMessage(HttpExceptionCode.FAILLURE);
      })
      .catch(WsCatch);
  }
  update({ id, body }: { id: number; body: CustomerDto }) {
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
  getAll() {
    return this.repos
      .find()
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
  getById({ id }: { id: number }) {
    return this.repos
      .findOne({ where: { id: Equal(id) } })
      .then((result) => {
        if (result) return BaseResponse.success(result);
        else;
      })
      .catch((err) => {
        console.log(err);
        if (err instanceof WsMessage) throw err;
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }
  getByPhone({ phone }: { phone: string }) {
    return this.repos
      .findOne({ where: { phone: Equal(phone) } })
      .then((result) => {
        if (result) return result;
        else
          return this.repos
            .save(this.repos.create({ phone }))
            .then((result2) => result2);
      })
      .catch((err) => {
        console.log(err);
        if (err instanceof WsMessage) throw err;
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }
  createBulk({ body }: { body: CustomerDto[] }) {
    return this.repos.manager
      .transaction((manager) => {
        return Promise.all(
          body.map((e) => {
            return manager.save(manager.create(Customer, e));
          }),
        )
          .then((value) => {
            return value;
          })
          .catch((_error) => {});
      })
      .then((value) => {
        return value;
      })
      .catch((err) => {});
  }
}
