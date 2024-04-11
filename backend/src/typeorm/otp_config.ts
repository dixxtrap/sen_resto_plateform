import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { CreationDetails } from './details.entity';
import { ApiProperty } from '@nestjs/swagger';
@Entity()
export class OtpConfig {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  label: string;
  @Column()
  maxAttemp: number;
  @Column({ default: 4 })
  lenght: number;
  @Column()
  duration: number;
  @Column({ default: false })
  isHash: boolean;
  @Column(() => CreationDetails)
  details: CreationDetails;
}

export class OtpConfigDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  label: string;
  @ApiProperty()
  maxAttemp: number;
  @ApiProperty()
  duration: number;
  @ApiProperty({ default: false })
  isHash: boolean;
}
