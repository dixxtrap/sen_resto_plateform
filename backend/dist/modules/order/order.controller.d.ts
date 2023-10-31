import { OrderService } from './order.service';
import { OrderAddPlate, OrderDto } from 'src/dto/order.dto';
import { Request } from 'express';
export declare class OrderController {
    private service;
    constructor(service: OrderService);
    getS(): Promise<import("../../typeorm").Order[]>;
    addPlate(body: OrderAddPlate): Promise<import("../../typeorm").OrderPlate>;
    getOrderByUser(decoded: Request): Promise<import("../../typeorm").Order[]>;
    create(body: OrderDto): Promise<import("../../typeorm").Order>;
    get(id: number): Promise<import("../../typeorm").Order>;
}
