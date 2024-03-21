import { InjectRepository } from '@nestjs/typeorm';
import { Customer, CustomerDto } from 'src/typeorm/customer.entity';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { Equal, Repository } from 'typeorm';

export class CustomerService {
  constructor(
    @InjectRepository(Customer) private repos: Repository<Customer>,
  ) {}
  create({ body }: { body: CustomerDto }) {
    return this.repos
      .save(this.repos.create(body))
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
        if (result) return result;
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
        if (result) return result;
        else throw new WsMessage(HttpExceptionCode.FAILLURE);
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
        else throw new WsMessage(HttpExceptionCode.FAILLURE);
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
          .catch((error) => {});
      })
      .then((value) => {
        return value;
      })
      .catch((err) => {});
  }
}
