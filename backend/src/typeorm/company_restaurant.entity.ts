import { ChildEntity, Column } from 'typeorm';
import { Partner, PartnerDto } from './partner.entity';
import { ApiProperty } from '@nestjs/swagger';
@ChildEntity()
export class CompanyRestaurantBase extends Partner {
  @Column()
  shortname: string;
  @Column('text')
  description: string;
  @Column()
  name: string;
  @Column('time', { default: '23:00:00' })
  closingTime: string;
  @Column('time', { default: '08:00:00' })
  openingTime: string;
}

@ChildEntity()
export class Restaurant extends CompanyRestaurantBase {}
@ChildEntity()
export class CompanyRestaurant extends CompanyRestaurantBase {}

export class CompanyRestaurantBaseDto extends PartnerDto {
  @ApiProperty()
  shortname: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  name: string;
}
