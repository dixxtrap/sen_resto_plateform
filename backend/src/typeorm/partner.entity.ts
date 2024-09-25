import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  ChildEntity,
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';
import { Coordonates, CoordonatesDto } from './coordonates.entity';
import { Address, AddressDto } from './address.entity';
import { CreationDetails } from './details.entity';
import { ApiProperty } from '@nestjs/swagger';
import { CompanyRestaurant, Restaurant } from './company_restaurant.entity';
import { Contrat } from './contrat.entity';
import { City } from './city.entity';
import { ProductManagement } from './product_management.entity';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
// import { IsBoolean } from 'class-validator';

@Entity({})
@Injectable()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export  class Partner  {
  @PrimaryGeneratedColumn()
  id: number;
  @Column(() => Coordonates)
  location: Coordonates;
  @Column()
  phone: string;
  @Column({nullable:true, default:null})
  address: string;
  @Column({ type: 'boolean', default: false })
  isActive: boolean;
  @Column({ default: true })
  isBloqued: boolean;
  @Column({ nullable: true, default: null, unique: true })
  email: string;
  @Column({ nullable: true, default: null })
  imagePath: string;
  @Column({ nullable: true, default: null })
  backgroundPath: string;
  @ManyToOne(() => City)
  city: City;
  @Column({ nullable: true, default: null })
  cityId: number;
@OneToMany(()=>ProductManagement, (alias)=>alias.partner)
productManagement:ProductManagement
  @ManyToOne(() => Partner)
  parent: Partner | Restaurant | CompanyRestaurant;
  @OneToMany(() => Partner, (item) => item.parent)
  children: Partner[] | Restaurant[] | CompanyRestaurant[];
  @Column({ nullable: true, default: null })
  parentId: number;
  @Column(() => CreationDetails)
  details: CreationDetails;
  @ManyToOne(() => Contrat)
  contrat: Contrat;
  @Column()
  type: string;
  @BeforeInsert()
  @BeforeUpdate()
  changeBoolean() {
    console.log(typeof(this.isActive))
    this.isActive=`${this.isActive}`=='true'
    this.isBloqued=`${this.isBloqued}`=='true'
  }
 
}

export class PartnerDto {
  id?: number;
  @ApiProperty()
  location: CoordonatesDto;
  @ApiProperty()
  address: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  // @IsBoolean()
  isActive: boolean;
  @ApiProperty()
  email: string;
  @ApiProperty()
  imagePath: string;
  @ApiProperty()
  backgroundPath: string;
  @ApiProperty()
  cityId: number;
  @ApiProperty()
  type: string;
  @ApiProperty()
  partnerId: number;
  partner: { id: number };
}

@ChildEntity()
@Injectable()
@Index(['phone', 'parentId'], { unique: true })
export  class Customer extends Partner {
  @Column({ nullable: true, default: null })
  firstname: string;
  @Column({ nullable: true, default: null })
  lastname: string;
  @Column({ nullable: true, default: false })
  isPhoneVeirified: boolean;
  @Column({ nullable: true, default: null })
  externalId: string;
  @Column(() => Coordonates)
  coordonates: Coordonates;
 
}
