import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';
// import { BaseEntity } from './BaseEntity.entity';
// import { TransactionTypeEnum } from 'src/enum/transaction_type.enum';
import { CreationDetails } from './details.entity';
import { Partner } from './partner.entity';

@Entity('transaction', { orderBy: { updatedAt: 'DESC', createdAt: 'DESC' } })
export class Transac {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'double', default: 0 })
  amount: number;
  @ManyToOne(() => Partner)
  sender: Partner ;
  @ManyToOne(() => Partner)
  receiver: Partner ;
  @Column({ nullable: true, default: null })
  receiverId: number;
  @Column({ nullable: true, default: null })
  senderId: number;
  @Column({ nullable: true, default: null })
  externalId: string;
  @Column({ nullable: true, default: null })
  externalName: string;
  @Column({ default: true })
  status: boolean;
  @Column(() => CreationDetails)
  details: CreationDetails;
}
