import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { CreationDetails, CreationDetailsDto } from './details.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum BannerType {
  WEB = 'web',
  MOBILE = 'mobile',
}
@Entity()
export class Banner {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  audioUrl: string;
  @Column()
  imageUrl: string;
  @Column({ enum: BannerType, type: 'enum' })
  type: BannerType;
  @Column()
  description: string;
  @Column('date')
  start: Date;
  @Column('date')
  end: Date;
  @Column(() => CreationDetails)
  details: CreationDetails;
  @Column()
  isActive: boolean;
}
export class BannerDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  audioUrl: string;
  @ApiProperty()
  imageUrl: string;
  @ApiProperty()
  banner: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  start: Date;
  @ApiProperty()
  end: Date;
  @ApiProperty({ type: () => CreationDetailsDto })
  details: CreationDetailsDto;
  @ApiProperty()
  isActive: boolean;
}
