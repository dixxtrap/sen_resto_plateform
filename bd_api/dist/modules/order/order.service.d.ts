import { OrderDto } from 'src/dto/order.dto';
import { Order, OrderPlate } from 'src/typeorm';
import { Repository } from 'typeorm';
export declare class OrderService {
    private repos;
    private reposOP;
    constructor(repos: Repository<Order>, reposOP: Repository<OrderPlate>);
    getS(): Promise<Order[]>;
    getById(id: number): Promise<Order>;
    create(body: OrderDto): Promise<Order>;
    getOrCreateOrder(customerId: number, restaurantId: number): Promise<Order>;
    addPlateHistory(orderId: number, plateHistoryId: number, quantity: number): Promise<OrderPlate>;
}
