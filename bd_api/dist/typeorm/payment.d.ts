import { Order } from './order';
import { PaymentType } from './payment_type';
export declare class Payment {
    id: number;
    order: Order;
    paymentType: PaymentType;
    status: string;
    extenalPaymentId: string;
    createdAt: Date;
    updatedAt: Date;
}
