import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from './order';
import { PaymentType } from './payment_type';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(() => Order)
  @JoinColumn()
  order: Order;
  @ManyToOne(() => PaymentType)
  paymentType: PaymentType;
  @Column('enum', {
    enum: ['success', 'refunded', 'pending', 'initiate', 'failled'],
  })
  status: string;
  @Column({ nullable: true })
  extenalPaymentId: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
