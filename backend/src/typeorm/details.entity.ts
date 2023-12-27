import { Column, CreateDateColumn, ManyToOne, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreationDetails {
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @ManyToOne(() => User)
  by: User;
  @Column({ nullable: true, default: null })
  byId: number;
}

export class CreationDetailsDto {
  createdAt: Date;

  updatedAt: Date;
  @ApiProperty({ nullable: true, default: null })
  byId: number;
}
