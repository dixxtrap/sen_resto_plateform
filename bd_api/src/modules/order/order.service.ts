import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDto } from 'src/dto/order.dto';
import { Order, OrderPlate } from 'src/typeorm';
import { OrderStatus } from 'src/typeorm/order';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private repos: Repository<Order>,
    @InjectRepository(OrderPlate) private reposOP: Repository<OrderPlate>,
  ) {}
  // ----------------------Commande-------------------
  async getS() {
    console.log('---------------------------get order----------------------');
    return await this.repos.find({});
  }

  getById(id: number) {
    return this.repos.findOne({ where: { id } });
  }

  create(body: OrderDto) {
    return this.repos.save(this.repos.create(body));
  }
  async getOrCreateOrder(customerId: number, restaurantId: number) {
    const order =
      (await this.repos.findOne({
        where: { customerId, restaurantId, status: OrderStatus.Empty },
      })) ??
      (await this.repos.save(
        this.repos.create({ customerId, restaurantId: restaurantId }),
      ));
    return order;
  }
  // ----------------------PlateOrder-------------------
  async addPlateHistory(
    orderId: number,
    plateHistoryId: number,
    quantity: number,
  ) {
    const orderPlate = await this.reposOP.findOne({
      where: { orderId: orderId, plateHistoryId: plateHistoryId },
    });
    if (!orderPlate) {
      const newOrderPlate = await this.reposOP.save(
        this.reposOP.create({ orderId, plateHistoryId, quantity }),
      );
      return newOrderPlate;
    } else {
      orderPlate.quantity = orderPlate.quantity + quantity;
      return await this.reposOP.save(orderPlate);
    }
  }
}
