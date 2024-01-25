import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
import { CreationDetails } from './details.entity';
@Entity()
export class ProductHistory {
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
  @ManyToOne(() => Product)
  product: Product;
  @Column()
  productId: number;
  @Column(() => CreationDetails)
  details: CreationDetails;
}
