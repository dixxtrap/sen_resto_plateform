import { OrderAddPlate, OrderDto } from 'src/dto/order.dto';
import { Order, OrderPlate, PlateHistory } from 'src/typeorm';
import { Repository } from 'typeorm';
export declare class OrderService {
    private repos;
    private reposOrderPlate;
    private reposPlateHistory;
    constructor(repos: Repository<Order>, reposOrderPlate: Repository<OrderPlate>, reposPlateHistory: Repository<PlateHistory>);
    getS(): Promise<Order[]>;
    getById(id: number): Promise<Order>;
    create(body: OrderDto): Promise<Order>;
    getOrCreateOrder(customerId: number, restaurantId: number): Promise<Order>;
    addPlate(body: OrderAddPlate): Promise<OrderPlate>;
    getOrderByUser(decoded: any): Promise<Order[]>;
}
