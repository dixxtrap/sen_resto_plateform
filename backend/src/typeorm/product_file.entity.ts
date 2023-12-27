import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductFile {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  path: string;
  @Column()
  idActive: boolean;
  @ManyToOne(() => Product)
  product: Product;
}
