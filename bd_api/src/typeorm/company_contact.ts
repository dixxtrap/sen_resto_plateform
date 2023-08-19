import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Company } from './';

import { Contact } from './contact';

@Entity()
export class CompanyContact extends Contact {
  @Column('int')
  companyId: number;
  @ManyToOne(() => Company)
  company: Company;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
