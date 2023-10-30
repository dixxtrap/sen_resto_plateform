import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Plate } from './plate';

@Entity({ orderBy: { createdAt: 'DESC' } })
export class PlateHistory {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Plate)
  plate: Plate;
  @Column()
  plateId: number;
  @Column()
  price: number;
  @Column()
  reduction: number;
  @UpdateDateColumn()
  updatedAt: Date;
  @CreateDateColumn()
  createdAt: Date;
}
