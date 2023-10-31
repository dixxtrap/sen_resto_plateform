import { OrderStatus } from 'src/typeorm/order';
export declare class OrderDto {
    id: number;
    customerId: number;
    restaurantId: number;
    deliveryDate: Date;
    status: OrderStatus;
    description: string;
    message: string;
}
export declare class OrderAddPlate {
    plateId: number;
    customerId: number;
    quantity: number;
}
