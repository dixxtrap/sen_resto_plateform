import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CompanyRestaurantBase } from './company_restaurant.entity';
import { CreationDetails } from './details.entity';
@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  serial: string;
  @Column()
  uid: string;
  @Column()
  pan: string;
  @ManyToOne(() => CompanyRestaurantBase)
  parent: CompanyRestaurantBase;
  @Column(() => CreationDetails)
  details: CreationDetails;
}
