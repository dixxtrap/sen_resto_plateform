import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('double')
  amount: number;
  @UpdateDateColumn()
  updatedAt: Date;
  @CreateDateColumn()
  createddAt: Date;
}
