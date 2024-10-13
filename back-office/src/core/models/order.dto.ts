import { Customer } from "./customer";
import { ProductHistoryDto } from "./product_history.dto";

export type OrderDto={
    id: number;
    status: OrderStatus;
    customer?:Customer;
    partner?:Customer;
    products?:OrderProductDto[]
    
}
export enum OrderStatus {
    OnBag = 'onbag',
    Active = 'active',

    Preparing = 'preparing',
    ReadyForDelivery = 'ready_for_delivery',
    OutForDelivery = 'out_for_delivery',
    Delivered = 'delivered',
    DeliveryDelayed = 'delivery_delayed',
    Cancelled = 'cancelled',
    QualityIssue = 'quality_issue',
    PaymentProcessing = 'payment_processing',
    RefundInProgress = 'refund_in_progress',
    OrderNotDelivered = 'order_not_delivered',
  }
export const statusMessages: { [key in OrderStatus]: string } = {
    [OrderStatus.OnBag]: "En attente",
    [OrderStatus.Preparing]: "en preparation",
    [OrderStatus.Cancelled]: "Cancelled",
    [OrderStatus.ReadyForDelivery]: "Ready For Delivery",
    [OrderStatus.OutForDelivery]: "Out For Delivery",
    [OrderStatus.Delivered]: "Delivered",
    [OrderStatus.DeliveryDelayed]: "Delivery Delayed",
    [OrderStatus.QualityIssue]: "Quality Issue",
    [OrderStatus.PaymentProcessing]: "Payment Processing",
    [OrderStatus.RefundInProgress]: "Refund In Progress",
    [OrderStatus.OrderNotDelivered]: "Order Not Delivered",
    [OrderStatus.Active]: "Confirmer"
};
export  type OrderProductDto={
    productHistory?:ProductHistoryDto;
    descrition:string;
    quantity?:number
}