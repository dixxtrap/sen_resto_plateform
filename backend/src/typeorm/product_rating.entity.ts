import { Entity, PrimaryColumn, ManyToOne, Column } from 'typeorm';

import { Product } from './product.entity';
import { CreationDetailsWithoutBy } from './details.entity';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { Customer } from './partner.entity';

@Entity()
export class ProductRaiting {
  @ManyToOne(() => Customer)
  customer: Customer;
  @Column({ default: 1 })
  raiting: number;
  @PrimaryColumn({})
  customerId: number;
  @ManyToOne(() => Product)
  product: Product;
  @PrimaryColumn({})
  productId: number;
  @Column(() => CreationDetailsWithoutBy)
  details: CreationDetailsWithoutBy;
}
export class ProductRaitingIdDto {
  @ApiProperty()
  customerId: number;
  @ApiProperty()
  productId: number;
}
export class ProductRaitingDto extends ProductRaitingIdDto {
  @ApiProperty()
  raiting: number;
}
