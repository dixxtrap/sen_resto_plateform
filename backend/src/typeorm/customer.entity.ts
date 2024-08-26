import { ChildEntity, Column, Index } from 'typeorm';
import { Partner, PartnerDto } from './partner.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Coordonates, CoordonatesDto } from './coordonates.entity';
import { AddressBaseDto, AddressDto } from './address.entity';
@ChildEntity()
@Index(['phone', 'parentId'], { unique: true })
export class Customer extends Partner {
  @Column({ nullable: true, default: null })
  firstname: string;
  @Column({ nullable: true, default: null })
  lastname: string;
  @Column({ nullable: true, default: false })
  isPhoneVeirified: boolean;
  @Column({ nullable: true, default: null })
  externalId: string;
  @Column({ unique: true, nullable: true, default: null })
  phone: string;
  @Column(() => Coordonates)
  coordonates: Coordonates;
}

export class CustomerDto extends PartnerDto {
  @ApiProperty()
  firstname: string;
  @ApiProperty()
  lastname: string;
  @ApiProperty()
  phone: string;
}

export class SetProfileDto {
  @ApiProperty()
  firstname: string;
  @ApiProperty()
  lastname: string;
  @ApiProperty( ) 
  address: string;
  @ApiProperty()
  coordonates: CoordonatesDto;
}
