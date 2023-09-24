import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { FileDocument, User } from '.';
@Entity()
export class PaymentType {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar', { length: 30 })
  name: string;
  @ManyToOne(() => User, {
    cascade: true,
    nullable: true,
    onUpdate: 'NO ACTION',
  })
  createBy: User;
  @Column()
  createById: number;
  @OneToOne(() => FileDocument, {
    cascade: true,
    nullable: true,
    onUpdate: 'NO ACTION',
  })
  @JoinColumn()
  profile: FileDocument;
  @Column('double', { default: 0 })
  fees: number;
  @Column('double', { default: 0 })
  feesInvert: number;
  @Column('bool', { default: false })
  isActive: boolean;
  @Column('varchar', { length: 250, nullable: true })
  description: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
