import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user';

@Entity()
export class Sms {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToMany(() => User)
  user: User[];
  @Column()
  userId: number;
  @Column({ length: 260 })
  content: string;
  @UpdateDateColumn()
  updatedAt: Date;
  @CreateDateColumn()
  createAt: Date;
}
