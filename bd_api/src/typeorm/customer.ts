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
  @Column() adresse: string;
  @Column({ default: false }) isPhoneVeirified: boolean;
  @Column({ nullable: true }) displayName: string;
  @Column({ default: 0 }) laltitude: number;
  @Column({ default: 0 }) longitude: number;
  @Column({ default: true }) isEnable: boolean;
  @UpdateDateColumn() updatedAt: Date;
  @CreateDateColumn() createdAt: Date;
}
