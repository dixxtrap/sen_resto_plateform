import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/typeorm/order.entity';
import { BaseResponse } from 'src/typeorm/response_base';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(@InjectRepository(Order) private repos: Repository<Order>) {}

  getAll() {
    return this.repos
      .find({ relations: { customer: true, deliver: true, partner: true } })
      .then((val) => {
        return BaseResponse.success(val);
      });
  }
  getById({ id }: { id: number }) {
    return this.repos
      .findOne({ where: { id } })
      .then((value) => BaseResponse.success(value));
  }
}
