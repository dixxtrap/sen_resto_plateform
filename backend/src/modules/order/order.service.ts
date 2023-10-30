import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderAddPlate, OrderDto } from 'src/dto/order.dto';
import { Order, OrderPlate, PlateHistory } from 'src/typeorm';
import { OrderStatus } from 'src/typeorm/order';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private repos: Repository<Order>,
    @InjectRepository(OrderPlate)
    private reposOrderPlate: Repository<OrderPlate>,
    @InjectRepository(PlateHistory)
    private reposPlateHistory: Repository<PlateHistory>,
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
        where: { customerId, restaurantId, status: OrderStatus.OnBag },
      })) ??
      (await this.repos.save(
        this.repos.create({ customerId, restaurantId: restaurantId }),
      ));
    return order;
  }
  // ----------------------PlateOrder-------------------
  async addPlate(body: OrderAddPlate) {
    const plateHistory = await this.reposPlateHistory.findOne({
      where: { plateId: body.plateId },
      relations: { plate: true },
    });
    const order = await this.getOrCreateOrder(
      body.customerId,
      plateHistory.plate.restaurantId,
    );
    const orderPlate = await this.reposOrderPlate.findOne({
      where: { orderId: order.id, plateHistoryId: plateHistory.id },
    });

    if (!orderPlate) {
      const newOrderPlate = await this.reposOrderPlate.save(
        this.reposOrderPlate.create({
          orderId: order.id,
          plateHistoryId: plateHistory.id,
          quantity: body.quantity,
        }),
      );
      return newOrderPlate;
    } else {
      orderPlate.quantity = orderPlate.quantity + body.quantity;
      return await this.reposOrderPlate.save(orderPlate);
    }
  }
  getOrderByUser(decoded: any) {
    console.log(decoded);
    return this.repos.find({
      where: { customerId: Equal(decoded.id) },
      relations: { plates: { plate: true } },
    });
  }
}
