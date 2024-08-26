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
  @Column({ nullable: true, default: null })
  audioUrl: string;
  @Column()
  imageUrl: string;
  @Column({ enum: BannerType, type: 'enum' })
  type: BannerType;
  @Column('text')
  description: string;
  @Column('datetime')
  start: Date;
  @Column('datetime')
  end: Date;
  @Column(() => CreationDetails)
  details: CreationDetails;
  @Column({ default: true })
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
