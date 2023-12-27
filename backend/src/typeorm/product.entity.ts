import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CompanyRestaurantBase } from './company_restaurant.entity';
import { CreationDetails } from './details.entity';
import { ProductFile } from './product_file.entity';
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column('double')
  price: number;
  @Column('double')
  reduction: number;
  @Column('double')
  cookingTime: number;
  @OneToMany(() => ProductFile, (item) => item.product)
  file: ProductFile;
  @ManyToOne(() => CompanyRestaurantBase)
  parent: CompanyRestaurantBase;
  @Column(() => CreationDetails)
  details: CreationDetails;
}
