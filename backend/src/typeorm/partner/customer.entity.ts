import {
  ChildEntity,
  Column,
  Index,
  BeforeInsert,
  AfterInsert,
  TableInheritance,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { CreationDetailsWithoutBy } from '../details.entity';
import { Coordonates, CoordonatesDto } from '../coordonates.entity';
import { Partner } from '../partner.entity';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

/// <reference path="./partner.entity" export="Customer" />
@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({nullable:true, default:null})
  displayname: string;
  @Column({ unique: true })
  phone: string;
  @Column({  })
  address: string;
  @Column(() => CreationDetailsWithoutBy) 
  details: CreationDetailsWithoutBy;
  @Column(() => Coordonates) 
  location: Coordonates;
  @ManyToOne(()=>Partner)
  partner:Partner
  @Column({nullable:true, default:true})
  partnerId:number
  
}

export class CustomerDto {
  id?:number;
  @ApiProperty()
  displayname: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  address:string;
}

export class SetProfileDto {

  @ApiProperty()
  displyname: string;
  @ApiProperty()
  address: string;
  @ApiProperty()
  location: CoordonatesDto;
}
