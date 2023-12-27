import {
  Entity,
  Column,
  OneToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  AfterLoad,
} from 'typeorm';
import { AppTransaction } from './transaction.entity';
import { Partner } from './partner.entity';
import { CompanyRestaurantBase } from './company_restaurant.entity';

@Entity({ orderBy: { createdAt: 'DESC' } })
export class WalletStatus {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(() => Partner)
  partner: Partner | CompanyRestaurantBase;
  @Column({ default: null, nullable: true })
  entityId: number;
  @Column({ default: 0, type: 'double' })
  totalCredit: number;
  @Column({ default: 0, type: 'double' })
  totalDebit: number;
  @ManyToOne(() => AppTransaction)
  @JoinColumn()
  transaction: AppTransaction;
  @Column({ nullable: true, default: null })
  transactionId: number;
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
  balance: number;
  @AfterLoad()
  getBalance() {
    this.balance = this.totalCredit - this.totalDebit;
  }
}
