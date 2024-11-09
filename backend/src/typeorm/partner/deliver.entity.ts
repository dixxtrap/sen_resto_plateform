import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Partner, PartnerDto } from '../partner.entity';
import { ApiProperty } from '@nestjs/swagger';
import { CreationDetails } from '../details.entity';
import { Company } from './company.entity';
import { Coordonates } from '../coordonates.entity';
@Entity()
export class Deliver  {
  @PrimaryGeneratedColumn()
  id:number
  @Column({ nullable: true, default: null })
  displayname: string;
  @Column({ nullable: true, default: null })
  password: string;
  @Column({ nullable: true, default: null })
  phone: string;
  @ManyToOne(()=>Company)
  company:Company
  @Column()
  companyId:number;
  @ManyToOne(()=>Partner)
  partner:Partner
  @Column()
  partnerId:number;
  @Column(()=>Coordonates)
  location:Coordonates
  @Column(()=>CreationDetails)
  details:CreationDetails
}

export class DeliverDto  {
  @ApiProperty({ nullable: true, default: null })
  displayname: string;
 
  @ApiProperty({ nullable: true, default: null })
  phone: string;
 
}
