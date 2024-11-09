import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Partner } from './partner.entity';

import { Deliver } from './partner/deliver.entity';
import { Company } from './partner/company.entity';

@Entity()
export class Contrat {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Company)
  partner: Company;
  @Column()
  startDate: Date;
  @Column()
  endDate: Date;
  @Column('decimal')
  entryFee: number;
  @Column()
  feePerItem: string;
}
