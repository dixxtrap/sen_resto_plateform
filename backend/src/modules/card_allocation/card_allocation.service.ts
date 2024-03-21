import { InjectRepository } from '@nestjs/typeorm';
import {
  CardAllocation,
  CardAllocationDto,
} from 'src/typeorm/card_allocation.entity';
import { UserDto } from 'src/typeorm/user.entity';
import { Repository } from 'typeorm';

export class CardAllocationService {
  constructor(
    @InjectRepository(CardAllocation) private repos: Repository<CardAllocation>,
  ) {}
  create({ body, by }: { body: CardAllocationDto; by: UserDto }) {
    return this.repos
      .save(this.repos.create({ ...body, details: { byId: by.id } }))
      .then((value) => {
        return value;
      });
  }
}
