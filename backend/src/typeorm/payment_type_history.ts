import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { PaymentType, User } from '.';
@Entity()
export class PaymentTypeHistory {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar', { length: 30 })
  name: string;
  @ManyToOne(() => User, {
    cascade: true,
    nullable: true,
    onUpdate: 'NO ACTION',
  })
  createBy: User;
  @Column()
  createById: number;
  @OneToOne(() => PaymentType, {
    cascade: true,
    nullable: true,
    onUpdate: 'NO ACTION',
  })
  @JoinColumn()
  paymentType: PaymentType;
  @Column({ nullable: true })
  paymentTypeId: number;
  @Column('double', { default: 0 })
  fees: number;
  @Column('double', { default: 0 })
  feesInvert: number;
  @Column('bool', { default: false })
  isActive: boolean;
  @Column('varchar', { length: 250, nullable: true })
  description: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
