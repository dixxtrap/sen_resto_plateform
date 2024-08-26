import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { CreationDetails } from './details.entity';
import { Order } from './order.entity';
export enum CommissionStatus {
  PAID = 'paid',
  UNPAID = 'unpaid',
}

@Entity()
export class Commission {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  amount: number;
  @ManyToOne(() => Order)
  order: Order;
  @Column({ enum: CommissionStatus, type: 'enum' })
  status: CommissionStatus;
  @Column(() => CreationDetails)
  details: CreationDetails;
}
