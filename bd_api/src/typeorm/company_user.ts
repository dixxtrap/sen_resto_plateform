import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Column,
  Index,
  UpdateDateColumn,
} from 'typeorm';
import { Company, User } from '.';
@Entity()
@Index(['userId', 'companyId'])
export class CompanyUser {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('int')
  companyId: number;
  @Column('int')
  userId: number;
  @Column({ default: true })
  isActive: boolean;
  @ManyToOne(() => Company, {
    cascade: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  company: Company;
  @ManyToOne(() => User, {
    cascade: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  user: User;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
