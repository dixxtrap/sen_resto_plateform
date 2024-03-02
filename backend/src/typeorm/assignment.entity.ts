import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Partner } from './partner.entity';
import { Customer } from './customer.entity';
import { Card } from './card.entity';
import { CreationDetails, CreationDetailsDto } from './details.entity';
import { ApiProperty } from '@nestjs/swagger';

export class Assignment {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Partner)
  owner: Partner | Customer;
  @ManyToOne(() => Card)
  card: Card;
  @Column({ nullable: true, default: null })
  ownerId: number;
  @Column({ nullable: true, default: null })
  cardId: number;
  @Column(() => CreationDetails)
  details: CreationDetails;
}
export class AssignmentDto {
  id?: number;
  @ApiProperty()
  cardId?: number;
  @ApiProperty()
  ownerId?: number;
  @ApiProperty({ type: () => CreationDetailsDto })
  details: CreationDetailsDto;
}
