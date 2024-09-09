import { ChildEntity, Column, Index, BeforeInsert, AfterInsert , TableInheritance, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {  Customer,PartnerDto } from './partner.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Coordonates, CoordonatesDto } from './coordonates.entity';
import { AddressBaseDto, AddressDto } from './address.entity';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { CreationDetails } from './details.entity';
import { CompanyRestaurant } from './company_restaurant.entity';
/// <reference path="./partner.entity" export="Customer" />


export class CustomerDto extends PartnerDto {
  @ApiProperty()
  firstname: string;
  @ApiProperty()
  lastname: string;
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


export {Customer};