import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order, OrderStatus } from 'src/typeorm/order.entity';
import { BaseResponse } from 'src/typeorm/response_base';
import { UserDto } from 'src/typeorm/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(@InjectRepository(Order) private repos: Repository<Order>) {}

  getAll() {
    return this.repos
      .find({ relations: { customer: true, deliver: true, partner: true , products:{productHistory:{product:true}}} })
      .then((val) => {
        return BaseResponse.success(val);
      });
  }

  preparingStatus({id, by}:{id:number,by:UserDto}){
    return this.repos.update({id,status:OrderStatus.Active},{status:OrderStatus.Preparing})
  }
  outForDeliveryStatus({id, by}:{id:number,by:UserDto}){
    return this.repos.update({id,status:OrderStatus.Active},{status:OrderStatus.OutForDelivery })
  }
  readyForDeliveryStatus({id, by}:{id:number,by:UserDto}){
    return this.repos.update({id,status:OrderStatus.Active},{status:OrderStatus.ReadyForDelivery })
  }
  getById({ id }: { id: number }) {
    return this.repos
      .findOne({ where: { id } })
      .then((value) => BaseResponse.success(value));
  }
}
