import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Weekday } from './weekday.entity';
import { Partner } from './partner.entity';
import { CompanyRestaurantBase } from './company_restaurant.entity';
import { CreationDetails, CreationDetailsDto } from './details.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from './product.entity';
@Entity()
export class ProductManagement {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Product)
  product: Product;
  @Column({ nullable: true, default: null })
  productId: number;
  @OneToOne(() => CompanyRestaurantBase)
  partner: CompanyRestaurantBase;
  @Column()
  partnerId: number;
  @Column()
  isActive: boolean;
  @OneToMany(() => ProductManagementDay, (item) => item.productManagement)
  productManagementDay: ProductManagementDay[];
  @Column(() => CreationDetails)
  details: CreationDetails;
}

export class ProductManagementDto {
  id?: number;
  @ApiProperty()
  partnerId?: number;
  @ApiProperty()
  productId?: number;
  @ApiProperty()
  isActive?: boolean;
  details?: CreationDetailsDto;
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

export class ProductManagementDayDto {
  @ApiProperty()
  productManagementId?: number;
  @ApiProperty()
  dayId?: number;
  @ApiProperty()
  isActive: boolean;
}
