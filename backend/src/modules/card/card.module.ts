import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from 'src/typeorm/card.entity';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { ExcelModule } from '../excel/excel.module';
import { CardAllocationModule } from '../card_allocation/card_allocation.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Card]),
    ExcelModule,
    CardAllocationModule,
  ],
  providers: [CardService],
  exports : [CardService],
  controllers: [CardController],
})
export class CardModule {}
