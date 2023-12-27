import { ChildEntity, Column } from 'typeorm';
import { Partner, PartnerDto } from './partner.entity';
import { ApiProperty } from '@nestjs/swagger';
@ChildEntity()
export class Customer extends Partner {
  @Column({ nullable: true, default: null })
  firstname: string;
  @Column({ nullable: true, default: null })
  lastname: string;
  @Column({ unique: true, nullable: true, default: null })
  phone: string;
}

export class CustomerDto extends PartnerDto {
  @ApiProperty()
  firstname: string;
  @ApiProperty()
  lastname: string;
}
