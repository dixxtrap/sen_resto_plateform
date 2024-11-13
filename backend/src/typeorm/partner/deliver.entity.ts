import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Partner, PartnerDto } from '../partner.entity';
import { ApiProperty } from '@nestjs/swagger';
import { CreationDetails } from '../details.entity';
import { Company } from './company.entity';
import { Coordonates, CoordonatesDto } from '../coordonates.entity';
@Entity()
export class Deliver {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ nullable: true, default: null })
  displayname: string;
  @Column({ nullable: true, default: null })
  password: string;
  @Column({ unique:true,  nullable: true, default: null })
  phone: string;
  @Column({ nullable: true, default: null })
  email: string;
  @Column({ nullable: true, default: null })
  address: string;
  @Column({ nullable: true, default: null })
  externalId: string;
  @ManyToOne(() => Company)
  company: Company
  @Column({ nullable: true, default: null })
  companyId: number;
  @ManyToOne(() => Partner)
  partner: Partner
  @Column({ nullable: true, default: null })
  partnerId: number;
  @Column(() => Coordonates)
  location: Coordonates
  @Column(() => CreationDetails)
  details: CreationDetails
}

export class DeliverDto {
  @ApiProperty({ nullable: true, default: null })
  displayname: string;
  @ApiProperty({ nullable: true, default: null })
  externalId: string;
  @ApiProperty({ nullable: true, default: null })
  email: string;
  @ApiProperty()
  address: string;
  @ApiProperty()
  location: CoordonatesDto;
  @ApiProperty()
  @ApiProperty({nullable: true, default: null })
  phone: string;

}
