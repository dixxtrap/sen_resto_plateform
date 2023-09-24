import { OrderService } from './order.service';
import { OrderDto } from 'src/dto/order.dto';
export declare class OrderController {
    private service;
    constructor(service: OrderService);
    getS(): Promise<import("../../typeorm").Order[]>;
    get(id: number): Promise<import("../../typeorm").Order>;
    create(body: OrderDto): Promise<import("../../typeorm").Order>;
}
