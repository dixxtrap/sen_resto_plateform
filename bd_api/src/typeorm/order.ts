import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  User,
  Plate,
  PlateHistory,
  Customer,
  PaymentTypeHistory,
  Restaurant,
} from './';

export enum OrderStatus {
  Empty = 'empty',
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
  @ManyToMany(() => Customer, {
    cascade: true,
    nullable: true,
    onUpdate: 'NO ACTION',
  })
  customer: Customer;
  @Column({ nullable: true, default: null })
  customerId: number;
  @ManyToMany(() => Restaurant, {
    cascade: true,
    nullable: true,
    onUpdate: 'NO ACTION',
  })
  restaurant: Restaurant;
  @Column({ nullable: true, default: null })
  restaurantId: number;
  @Column('datetime')
  deliveryDate: Date;
  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.Empty,
  })
  status: OrderStatus;
  @ManyToMany(() => Plate, {
    cascade: true,
    onUpdate: 'NO ACTION',
    onDelete: 'NO ACTION',
  })
  @Column({ nullable: true, default: null })
  paymentTypeHistoryId: number;
  @ManyToOne(() => PaymentTypeHistory)
  @JoinColumn()
  paymentTypeHistory: PaymentTypeHistory;
  @Column({ nullable: true })
  description: string;
  @Column({ nullable: true })
  message: string;
  @ManyToMany(() => PlateHistory, {
    cascade: true,
    onUpdate: 'NO ACTION',
    onDelete: 'NO ACTION',
  })
  @JoinTable()
  plates: PlateHistory[];
  @Column({ default: 0, type: 'float' })
  amount: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
