import { ChildEntity, Column } from 'typeorm';
import {
  CompanyRestaurantBase,
  CompanyRestaurantBaseDto,
} from './company_restaurant.entity';
import { ApiProperty } from '@nestjs/swagger';

@ChildEntity()
export class PaymentType extends CompanyRestaurantBase {
  @Column('double')
  fees: number;
  @Column('double')
  invertFees: number;
}
 
export class PaymentTypeDto extends CompanyRestaurantBaseDto {
  @ApiProperty()
  fees: number;
  @ApiProperty()
  invertFees: number;
}
