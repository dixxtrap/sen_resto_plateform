import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Restaurant } from '.';
import { Contact } from './contact';

@Entity()
export class RestaurantContact extends Contact {
  @Column()
  restaurantId: number;
  @ManyToOne(() => Restaurant)
  restaurant: Restaurant;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
