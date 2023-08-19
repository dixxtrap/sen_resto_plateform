import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class PaymentType {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar', { length: 30 })
  name: string;
  @Column('double', { default: 0 })
  percent: number;
  @Column('varchar', { length: 250 })
  description: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
