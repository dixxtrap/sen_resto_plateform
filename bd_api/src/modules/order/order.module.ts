import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order, OrderPlate } from 'src/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderPlate])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
