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
import { User, Plate, PlateHistory, Customer, PaymentTypeHistory } from './';

export enum OrderStatus {
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
  @OneToOne(() => Customer)
  costumer: Customer;
  @Column('datetime')
  deliveryDate: Date;
  @Column({
    type: 'enum',
    enum: OrderStatus,
  })
  status: OrderStatus;
  @ManyToMany(() => Plate, {
    cascade: true,
    onUpdate: 'NO ACTION',
    onDelete: 'NO ACTION',
    eager: true,
  })
  @Column({ nullable: true, default: null })
  paymentTypeHistoryId: number;
  @ManyToOne(() => PaymentTypeHistory)
  @JoinColumn()
  paymentTypeHistory: PaymentTypeHistory;
  @Column()
  description: string;
  @Column()
  message: string;
  @ManyToMany(() => PlateHistory, {
    cascade: true,
    onUpdate: 'NO ACTION',
    onDelete: 'NO ACTION',
    eager: true,
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
