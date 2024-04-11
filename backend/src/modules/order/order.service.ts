import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order, OrderStatus } from 'src/typeorm/order.entity';
import { BaseResponse } from 'src/typeorm/response_base';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(@InjectRepository(Order) private repos: Repository<Order>) {}

  findOrderOrCreate({
    partnerId,
    customerId,
  }: {
    partnerId: number;
    customerId: number;
  }) {
    return this.repos
      .findOne({
        where: { customerId, partnerId, status: OrderStatus.OnBag },
      })
      .then((order) => {
        if (order) return BaseResponse.success(order) as BaseResponse<Order>;
        return this.repos
          .save(
            this.repos.create({
              customerId,
              partnerId,
              status: OrderStatus.OnBag,
            }),
          )
          .then(
            (newOrder) => BaseResponse.success(newOrder) as BaseResponse<Order>,
          );
      })
      .catch((err) => {
        if (err instanceof WsMessage) throw err;
        console.log(err);
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }

  addProductToOrder({
    customerId,
    partnerId,
  }: {
    partnerId: number;
    productId: number;
    customerId: number;
  }) {
    return this.findOrderOrCreate({ customerId, partnerId }).then((order) => {
      return order;
    });
  }
}
