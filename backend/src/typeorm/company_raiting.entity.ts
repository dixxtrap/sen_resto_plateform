import { Entity, PrimaryColumn, ManyToOne, Column } from 'typeorm';
import { Customer } from './customer.entity';
import { CreationDetailsWithoutBy } from './details.entity';
import { Partner } from './partner.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class CompanyRating {
  @ManyToOne(() => Customer)
  customer: Customer;
  @PrimaryColumn({})
  customerId: number;
  @ManyToOne(() => Partner)
  company: Partner;
  @Column({ default: 1 })
  raiting: number;
  @PrimaryColumn({})
  companyId: number;
  @Column(() => CreationDetailsWithoutBy)
  details: CreationDetailsWithoutBy;
}

export class CompanyRatingDto {
  id?: number;
  @ApiProperty()
  customerId: number;
  @ApiProperty()
  companyId: number;
}
