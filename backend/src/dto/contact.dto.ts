import { ApiProperty, IntersectionType, PartialType } from '@nestjs/swagger';
import { CompanyContact, Contact, RestaurantContact } from 'src/typeorm';

export class ContactDto extends PartialType(Contact) {
  @ApiProperty()
  adress?: string;
  @ApiProperty()
  firstname?: string;
  @ApiProperty()
  email?: string;
  @ApiProperty()
  lastname?: string;
  @ApiProperty()
  telephhone?: string;
  id?: number;
}

export class CompanyContactDto extends IntersectionType(
  ContactDto,
  CompanyContact,
) {
  @ApiProperty()
  companyId: number;
}

export class RestaurantContactDto extends IntersectionType(
  ContactDto,
  RestaurantContact,
) {
  @ApiProperty()
  restaurantId: number;
}
