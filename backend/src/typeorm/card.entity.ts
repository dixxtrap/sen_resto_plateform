import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CompanyRestaurantBase } from './company_restaurant.entity';
import { CreationDetails, CreationDetailsDto } from './details.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Assignment } from './assignment.entity';
export enum CardStatusEnum {
  pending = 'In Progress',
  Assigned = 'Assigned',
  readyForAllocation = 'Ready for Allocation',
  blocked = 'Blocked',
  delected = 'Delected',
  cancelled = 'Cancelled',
}
@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  serial: string;
  @Column({ unique: true })
  uid: string;
  @Column()
  pan: string;
  @Column('enum', {
    enum: CardStatusEnum,
    default: CardStatusEnum.readyForAllocation,
  })
  status: CardStatusEnum;
  @Column({ default: false })
  isAsssignate: boolean;
  @ManyToOne(() => Assignment)
  assignment: Assignment;
  @Column({ nullable: true, default: null })
  assignmentId: number;
  @ManyToOne(() => CompanyRestaurantBase)
  parent: CompanyRestaurantBase;
  @Column({ nullable: true, default: null })
  parentId: number;
  @Column(() => CreationDetails)
  details: CreationDetails;
}

export class CardDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  serial: string;
  @ApiProperty()
  uid: string;
  @ApiProperty()
  pan: string;
  @ApiProperty()
  parentId: number;
  @ApiProperty()
  assignmentId: number;
  @ApiProperty({ type: () => CreationDetailsDto })
  details: CreationDetailsDto;
}
