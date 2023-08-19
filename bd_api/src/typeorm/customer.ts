import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  PrimaryColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn() id: number;
  @Column({ unique: true }) phone: string;
  @Column({ default: false }) isPhoneVeirified: boolean;
  @Column({ nullable: true }) displayName: string;
  @Column({ default: 0 }) laltitude: number;
  @Column({ default: 0 }) longitude: number;
  @UpdateDateColumn() updatedAt: Date;
  @CreateDateColumn() createdAt: Date;
}
