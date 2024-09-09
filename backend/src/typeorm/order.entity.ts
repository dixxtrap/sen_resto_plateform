import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CompanyRestaurantBase } from './company_restaurant.entity';
import { CreationDetails } from './details.entity';

import { Deliver } from './deliver.entity';
import { OrderProduct } from './order_product.entity';
import { Customer } from './partner.entity';
export class AddOrderDto {
  productId: number;
  partnerId: number;
  customerId: number;
  description: string;
  quantity: number;
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
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => CompanyRestaurantBase)
  restaurant: CompanyRestaurantBase;
  @ManyToOne(() => CompanyRestaurantBase)
  partner: CompanyRestaurantBase;
  @Column({ nullable: true, default: null })
  partnerId: number;
  @Column({ nullable: true, default: null })
  restaurantId: number;
  @ManyToOne(() => Customer)
  customer: Customer;
  @Column({ nullable: true, default: null })
  customerId: number;
  @ManyToOne(() => Deliver)
  deliver: Deliver;
  @Column({ nullable: true, default: null })
  deliverId: number;
  @Column(() => CreationDetails)
  details: CreationDetails;
  @Column('timestamp', { nullable: true })
  deliveryDate: Date;
  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.OnBag,
  })
  status: OrderStatus;
  @OneToMany(() => OrderProduct, (item) => item.order)
  products: OrderProduct[];
}
