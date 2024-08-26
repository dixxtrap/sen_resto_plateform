import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ProductFile {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  path: string;
  @Column({ default: true })
  idActive: boolean;
  @ManyToOne(() => Product)
  product: Product;
  @Column()
  productId: number;
}

export class ProductFileDto {
  id?: number;
  @ApiProperty()
  productId?: number;
  path?: string;
  @ApiProperty()
  idActive?: boolean;
}
