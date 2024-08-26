import { ChildEntity, Column } from 'typeorm';
import { Partner, PartnerDto } from './partner.entity';
import { ApiProperty } from '@nestjs/swagger';
@ChildEntity()
export class Deliver extends Partner {
  @Column({ nullable: true, default: null })
  firstname: string;
  @Column({ nullable: true, default: null })
  lastname: string;
}

export class DeliverDto extends PartnerDto {
  @ApiProperty({ nullable: true, default: null })
  firstname: string;
  @ApiProperty({ nullable: true, default: null })
  lastname: string;
}
