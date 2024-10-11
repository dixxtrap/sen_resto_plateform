import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityProviderEnum } from 'src/typeorm/entity_provider_enum';
import { Order, OrderStatus } from 'src/typeorm/order.entity';
import { BaseResponse } from 'src/typeorm/response_base';
import { UserDto } from 'src/typeorm/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(@Inject(EntityProviderEnum.ORDER) private repos: Repository<Order>) {}

  getAll({by}:{by:UserDto}) {
    return this.repos
      .find({where:[{partnerId:by.parentId}, {partner:{parentId:by.parentId}}], relations: { customer: true, deliver: true, partner: true , products:{productHistory:{product:true}}} })
      .then((val) => {
        return BaseResponse.success(val);
      });
  }

  changeStatus({id,status, by}:{id:number,status:OrderStatus,by:UserDto}){
    return this.repos.update({id,},{status:status})
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
