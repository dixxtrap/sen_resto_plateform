import { PlateHistory, Customer, PaymentTypeHistory, Restaurant } from '.';
export declare enum OrderStatus {
    Empty = "empty",
    OnBag = "onbag",
    Active = "active",
    Preparing = "preparing",
    ReadyForDelivery = "ready_for_delivery",
    OutForDelivery = "out_for_delivery",
    Delivered = "delivered",
    DeliveryDelayed = "delivery_delayed",
    Cancelled = "cancelled",
    QualityIssue = "quality_issue",
    PaymentProcessing = "payment_processing",
    RefundInProgress = "refund_in_progress",
    OrderNotDelivered = "order_not_delivered"
}
export declare class Order {
    id: number;
    customer: Customer;
    customerId: number;
    restaurant: Restaurant;
    restaurantId: number;
    deliveryDate: Date;
    status: OrderStatus;
    paymentTypeHistoryId: number;
    paymentTypeHistory: PaymentTypeHistory;
    description: string;
    message: string;
    plates: PlateHistory[];
    amount: number;
    createdAt: Date;
    updatedAt: Date;
}
