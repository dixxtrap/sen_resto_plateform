import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/typeorm/order.entity';
import { Repository } from 'src/typeorm/repository';

@Injectable()
export class WsOrderService {
  constructor(@InjectRepository(Order) private repos: Repository<Order>) {}
}
