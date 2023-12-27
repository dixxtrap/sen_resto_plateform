import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  TableInheritance,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { Coordonates, CoordonatesDto } from './coordonates.entity';
import { Address, AddressDto } from './address.entity';
import { CreationDetails } from './details.entity';
import { ApiProperty } from '@nestjs/swagger';
import { CompanyRestaurant, Restaurant } from './company_restaurant.entity';
import { Contrat } from './contrat.entity';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class Partner {
  @PrimaryGeneratedColumn()
  id: number;
  @Column(() => Coordonates)
  location: Coordonates;
  @Column()
  phone: string;
  @Column()
  email: string;
  @Column({ nullable: true, default: null })
  imagePath: string;
  @Column(() => Address)
  address: Address;
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
}

export class PartnerDto {
  id: number;
  @ApiProperty()
  location: CoordonatesDto;
  @ApiProperty()
  address: AddressDto;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  imagePath: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
  partnerId: number;
  partner: { id: number };
}
