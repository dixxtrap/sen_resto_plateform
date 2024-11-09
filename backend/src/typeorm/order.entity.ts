import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreationDetails } from './details.entity';

import { Deliver } from './partner/deliver.entity';
import { OrderProduct } from './order_product.entity';
import { City } from './city.entity';
import { Coordonates, CoordonatesDto } from './coordonates.entity';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { Company } from './partner/company.entity';
import { CompanyShop } from './partner/company_shop.entity';
import { Customer } from './partner/customer.entity';
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
  @ManyToOne(() => CompanyShop)
  shop: CompanyShop;
  @ManyToOne(() => Company)
  partner: Company;
  @Column({ nullable: true, default: null })
  partnerId: number;
  @Column({ nullable: true, default: null })
  shopId: number;
  @ManyToOne(() => Customer)
  customer: Customer;
  @Column({ nullable: true, default: null })
  customerId: number;
  @ManyToOne(() => Deliver)
  deliver: Deliver;
  @ManyToOne(() => City)
  city: City;
  @Column({ nullable: true, default: null })
  deliverId: number;
  @Column({ nullable: true, default: null })
  cityId: number;
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
  @Column("text", {nullable:true, default:null})
  description:string;
  @Column( {nullable:true, default:null})
  address:string;
  @Column('double', {default:0})
  fees: number;
  @Column(()=>Coordonates)
  location:Coordonates
}


export class OrderDto{
@ApiProperty()
address?:string;
@ApiProperty()
description?:string;
location?:CoordonatesDto;
}