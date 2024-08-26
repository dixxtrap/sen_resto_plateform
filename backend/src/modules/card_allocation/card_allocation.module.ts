import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardAllocation } from 'src/typeorm/card_allocation.entity';
import { CardAllocationService } from './card_allocation.service';
import { CardAllocationController } from './card_allocation.controller';
import { CardAllocationDetails } from 'src/typeorm/card_allocation_details.entity';
import { Card } from 'src/typeorm/card.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CardAllocation, CardAllocationDetails, Card]),
  ],
  controllers: [CardAllocationController],
  providers: [CardAllocationService],
  exports: [CardAllocationService],
})
export class CardAllocationModule {}
