import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Weekday } from './weekday.entity';
import { Partner } from './partner.entity';
import { CompanyRestaurantBase } from './company_restaurant.entity';
@Entity()
export class ProductManagement {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(() => CompanyRestaurantBase)
  partner: CompanyRestaurantBase;
  @Column()
  isActive: boolean;
}
@Entity()
export class ProductManagementDay {
  @PrimaryColumn()
  productManagementId: number;
  @ManyToOne(() => ProductManagement)
  productManagement: ProductManagement;
  @PrimaryColumn()
  dayId: number;
  @ManyToOne(() => Weekday)
  day: Weekday;
  @Column()
  isActive: boolean;
}
