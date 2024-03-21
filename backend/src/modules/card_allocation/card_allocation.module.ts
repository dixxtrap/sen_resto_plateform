import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardAllocation } from 'src/typeorm/card_allocation.entity';
import { CardAllocationService } from './card_allocation.service';
import { CardAllocationController } from './card_allocation.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CardAllocation])],
  controllers: [CardAllocationController],
  providers: [CardAllocationService],
  exports: [CardAllocationService],
})
export class CardAllocationModule {}
