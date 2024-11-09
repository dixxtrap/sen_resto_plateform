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
import { CreationDetails } from './details.entity';
import { ApiProperty } from '@nestjs/swagger';

import { Contrat } from './contrat.entity';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { PartnerEnum } from 'src/enum/partner.enum';
// import { IsBoolean } from 'class-validator';
@Entity({})
export class Partner {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  partnerId:number
  @ManyToOne(() => Contrat)
  contrat: Contrat;
  @Column("enum",{enum:PartnerEnum})
  type: PartnerEnum;
  
}

export class PartnerDto {
  id?: number;
 
  @ApiProperty()
  type: PartnerEnum;
  @ApiProperty()
  partnerId: number;
 
}


