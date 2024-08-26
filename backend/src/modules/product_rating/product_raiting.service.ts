import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ProductRaiting,
  ProductRaitingDto,
} from 'src/typeorm/product_rating.entity';
import { BaseResponse } from 'src/typeorm/response_base';
import { WsCatch } from 'src/utils/catch';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { Repository } from 'typeorm';
@Injectable()
export class ProductRaitingService {
  constructor(
    @InjectRepository(ProductRaiting) private repos: Repository<ProductRaiting>,
  ) {}
  getAll() {
    return this.repos.find().then((result) => {
      return BaseResponse.success(result);
    });
  }
  getById({
    productId,
    customerId,
  }: {
    productId: number;
    customerId: number;
  }) {
    return this.repos
      .findOne({ where: { customerId, productId } })
      .then((result) => {
        if (result) return BaseResponse.success(result);
        throw new WsMessage(HttpExceptionCode.NOT_FOUND);
      })
      .catch(WsCatch);
  }
  create({ body }: { body: ProductRaitingDto }) {
    return this.repos
      .save(this.repos.create(body))
      .then((result) => {
        if (result) throw new WsMessage(HttpExceptionCode.SUCCEEDED);
        else throw new WsMessage(HttpExceptionCode.FAILLURE);
      })
      .catch(WsCatch);
  }
  update({ id, body }: { id: number; body: ProductRaitingDto }) {
    return this.repos
      .update({ customerId: id, productId: body.productId }, body)

      .then((result) => {
        if (result) throw new WsMessage(HttpExceptionCode.SUCCEEDED);
        else throw new WsMessage(HttpExceptionCode.FAILLURE);
      })
      .catch(WsCatch);
  }
}
