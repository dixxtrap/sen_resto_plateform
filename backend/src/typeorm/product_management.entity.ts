import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  Index,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import { Partner } from './partner.entity';
import { CreationDetails, CreationDetailsDto } from './details.entity';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { Product } from './product.entity';
import { CompanyShop } from './partner/company_shop.entity';

@Entity()
@Index(['productId', 'shopId'])
export class ProductManagement {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Product) 
  product: Product;
  @Column({ nullable: true, default: null })
  productId: number;
  @ManyToOne(() => CompanyShop)
  shop: CompanyShop;
  @Column()
  shopId: number;
  @Column()
  isActive: boolean;
  @Column(() => CreationDetails)
  details: CreationDetails;
}

export class ProductManagementDto {
  id?: number;
  @ApiProperty()
  shopId?: number;
  @ApiProperty()
  productId?: number;
  @ApiProperty()
  isActive?: boolean;
  details?: CreationDetailsDto;
}

