import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user';
import { Plate } from './plate';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(() => User)
  user: User;

  @ManyToMany(() => Plate, {
    cascade: true,
    onUpdate: 'NO ACTION',
    onDelete: 'NO ACTION',
    eager: true,
  })
  @JoinTable()
  plates:Plate[];
  @Column({ default: 0, type: 'float' })
  amount: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
