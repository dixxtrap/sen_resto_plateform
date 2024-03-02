import { InjectRepository } from '@nestjs/typeorm';
import { CardAllocation } from 'src/typeorm/card_allocation.entity';
import { Repository } from 'typeorm';

export class CardAllocationService {
  constructor(
    @InjectRepository(CardAllocation) private repos: Repository<CardAllocation>,
  ) {}
}
