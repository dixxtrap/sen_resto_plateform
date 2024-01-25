import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/typeorm/product.entity';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { Repository } from 'typeorm';

@Injectable()
export class WsProductService {
  constructor(@InjectRepository(Product) private repos: Repository<Product>) {}
  getAll() {
    return this.repos
      .find({
        relations: { category: true, file: true, parent: true },
        select: { parent: { shortname: true, id: true } },
      })
      .then((result) => {
        return result.sort(() => Math.random() - 0.5);
      })
      .catch((err) => {
        console.log(err);
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }
  getById({ id }: { id: number }) {
    return this.repos
      .findOne({ where: { id }, relations: { category: true, file: true } })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }
}
