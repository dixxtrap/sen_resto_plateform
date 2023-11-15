import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PlateHistory } from './plate_amount';
import { Order } from './order';

@Entity()
export class OrderPlate {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => PlateHistory)
  plateHistory: PlateHistory;
  @Column()
  plateHistoryId: number;
  @Column('text', { default: '' })
  comment: string;
  @Column({ default: 0 })
  quantity: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @ManyToOne(() => Order)
  order: number;
  @Column()
  orderId: number;
}

// order_plates_order_plate
