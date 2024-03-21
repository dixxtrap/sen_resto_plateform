import { Column, PrimaryGeneratedColumn, ManyToOne, Entity } from 'typeorm';
import { CreationDetailsWithoutBy } from './details.entity';
import { OtpConfig } from './otp_config';
import { ApiProperty } from '@nestjs/swagger';
export enum OtpType {
  WEB = 'web',
  MOBILE = 'mobile',
}
export enum OtpStatus {
  validate = 'validate',
  expired = 'expired',
  pending = 'pending',
}
@Entity()
export class Otp {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => OtpConfig)
  config: OtpConfig;
  @Column()
  code: string;
  @Column()
  to: string;
  @Column('enum', { enum: OtpStatus, default: OtpStatus.validate })
  status: OtpStatus;
  @Column('enum', { enum: OtpType, default: OtpType.MOBILE })
  channel: OtpType;
  @Column(() => CreationDetailsWithoutBy)
  details: CreationDetailsWithoutBy;
}
export class OtpDto {
  @ApiProperty()
  configId: number;
  @ApiProperty()
  to: string;
  @ApiProperty()
  code: string;
  @ApiProperty()
  status: string;
  @ApiProperty()
  channel: string;
}
