import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CreationDetails } from './details.entity';
import { Card } from './card.entity';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';
import { Partner } from './partner.entity';
export enum AllocationStatusEnum {
  initiate = 'initiate',
  accepted = 'accepted',
  rejected = 'rejected',
}

@Entity()
export class CardAllocation {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Partner)
  sender: Partner;
  @ManyToOne(() => Partner)
  receiver: Partner;
  @Column({ nullable: true, default: null })
  senderId: number;
  @Column({ nullable: true, default: null })
  receiverId: number;
  @Column({ type: 'varchar' })
  startSerial: string;
  @Column({ type: 'varchar' })
  endSerial: string;
  @Column()
  quantity: number;
  @Column()
  label: string;

  @ManyToMany(() => Card)
  @JoinTable({ name: 'card_allocation_details' })
  card: Card[];
  @Column({ nullable: true, default: null })
  motif: string;
  @ManyToOne(() => User)
  acceptedBy: User;
  @Column({ nullable: true, default: null })
  acceptedById: number;
  @Column({ nullable: true, default: null })
  rejectionMotif: string;
  @Column({
    type: 'enum',
    enum: AllocationStatusEnum,
    default: AllocationStatusEnum.initiate,
    nullable: true,
  })
  status: AllocationStatusEnum;
  @Column(() => CreationDetails)
  details: CreationDetails;
}

export class CardAllocationDto {
  id?: number;
  @ApiProperty()
  label: string;
  @ApiProperty()
  rejectionMotif: string;
  @ApiProperty()
  motif: string;
  @ApiProperty()
  senderId: number;
  @ApiProperty()
  quantity: number;
  @ApiProperty()
  status: AllocationStatusEnum;
  @ApiProperty()
  receiverId: number;
  @ApiProperty()
  startSerial: string;
  @ApiProperty({ type: 'varchar' })
  endSerial: string;
}
