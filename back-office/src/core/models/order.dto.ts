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
    [OrderStatus.OnBag]: "En attente de confirmation!",
    [OrderStatus.Preparing]: "An error occurred during the operation.",
    [OrderStatus.Cancelled]: "The operation is currently in progress.",
    [OrderStatus.ReadyForDelivery]: "",
    [OrderStatus.OutForDelivery]: "",
    [OrderStatus.Delivered]: "",
    [OrderStatus.DeliveryDelayed]: "",
    [OrderStatus.QualityIssue]: "",
    [OrderStatus.PaymentProcessing]: "",
    [OrderStatus.RefundInProgress]: "",
    [OrderStatus.OrderNotDelivered]: ""
};
export  type OrderProductDto={
    productHistory?:ProductHistoryDto;
    descrition:string;
    quantity?:number
}