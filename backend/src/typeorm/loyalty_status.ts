import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Partner } from './partner.entity';
import { User } from './user.entity';
import { CreationDetails } from './details.entity';
import { Transac } from './transaction.entity';

@Entity()
export class LoyaltyStatus {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Partner)
  partner: Partner;
  @ManyToOne(() => User)
  user: User;
  @Column({ default: 0, type: 'double' })
  totalCredit: number;
  @ManyToOne(() => Transac)
  transac: Transac;
  @Column({ default: 0, type: 'double' })
  totalDebit: number;
  @Column(() => CreationDetails)
  details: CreationDetails;
}
