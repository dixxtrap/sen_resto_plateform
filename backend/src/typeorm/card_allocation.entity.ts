import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CompanyRestaurantBase } from './company_restaurant.entity';
import { CreationDetails } from './details.entity';
import { Card } from './card.entity';
import { ApiProperty } from '@nestjs/swagger';
export enum AllocationStatusEnum {
  initiate = 'initiate',
  accepted = 'accepted',
  rejected = 'rejected',
}

@Entity()
export class CardAllocation {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => CompanyRestaurantBase)
  sender: CompanyRestaurantBase;
  @ManyToOne(() => CompanyRestaurantBase)
  receiver: CompanyRestaurantBase;
  @Column({ nullable: true, default: null })
  senderId: number;
  @Column({ nullable: true, default: null })
  receiverId: number;
  @Column({ type: 'varchar' })
  startSerialNumber: string;
  @Column({ type: 'varchar' })
  endSerialNumber: string;
  @Column()
  quantity: number;
  @Column()
  label: string;

  @ManyToMany(() => Card)
  @JoinTable({ name: 'card_allocation_details' })
  card: Card[];
  @Column()
  motif: string;
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
  @ApiProperty()
  label: string;
  @ApiProperty()
  motif: string;
  @ApiProperty()
  senderId: number;
  @ApiProperty()
  status: AllocationStatusEnum;
  @ApiProperty()
  receiverId: number;
  @ApiProperty()
  startSerialNumber: string;
  @ApiProperty({ type: 'varchar' })
  endSerialNumber: string;
}
