import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order, OrderPlate, PlateHistory } from 'src/typeorm';
import { JWT } from 'src/jtw';

@Module({
  imports: [JWT, TypeOrmModule.forFeature([Order, OrderPlate, PlateHistory])],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
