import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class OrderProductService {
  constructor(
    @InjectRepository(OrderProductService)
    private repos: Repository<OrderProductService>,
  ) {}
  create({}:{ }){}
}
