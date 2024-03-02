import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import {
  CompanyRestaurantBase,

} from './company_restaurant.entity';
import { CreationDetails, CreationDetailsDto } from './details.entity';
import { ApiProperty } from '@nestjs/swagger';
@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  serial: string;
  @Column()
  uid: string;
  @Column()
  pan: string;
  @ManyToOne(() => CompanyRestaurantBase)
  parent: CompanyRestaurantBase;
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
  @ApiProperty({ type: () => CreationDetailsDto })
  details: CreationDetailsDto;
}
