import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Partner } from './partner.entity';
import { CompanyRestaurantBase } from './company_restaurant.entity';
import { Deliver } from './deliver.entity';

@Entity()
export class Contrat {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Partner)
  partner: CompanyRestaurantBase | Deliver | Partner;
  @Column()
  startDate: Date;
  @Column()
  endDate: Date;
  @Column('decimal')
  entryFee: number;
  @Column()
  feePerItem: string;
}
