import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Column,
  Index,
  UpdateDateColumn,
} from 'typeorm';
import { Restaurant, User } from '.';
@Entity()
@Index(['userId', 'restaurantId'])
export class RestaurantUser {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('int')
  restaurantId: number;
  @Column('int')
  userId: number;
  @Column({ default: true })
  isActive: boolean;
  @ManyToOne(() => Restaurant)
  restaurant: Restaurant[];
  @ManyToOne(() => User)
  user: User[];
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
