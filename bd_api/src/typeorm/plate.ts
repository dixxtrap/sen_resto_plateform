import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { PlateFile, Restaurant, User } from '.';
import { Tag } from './tag';

@Entity()
export class Plate {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Restaurant)
  resaturant: Restaurant;
  @Column()
  restaurantId: number;
  @Column('varchar', { length: '35' })
  name: string;
  @OneToMany(() => PlateFile, (file) => file.plate)
  file: PlateFile;
  @Column('varchar', { length: '350' })
  description: string;
  @ManyToMany(() => Tag, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinTable()
  tag: Tag[];
  @Column()
  price: number;
  @Column({ default: true })
  monday: boolean;
  @Column({ default: true })
  tuesday: boolean;
  @Column({ default: true })
  wednesday: boolean;
  @Column({ default: true })
  thursday: boolean;
  @Column({ default: true })
  friday: boolean;
  @Column({ default: true })
  saturday: boolean;
  @Column({ default: true })
  sunday: boolean;
  @Column({ name: 'cooking_time' })
  cookingTime: number;
  @Column({ default: 0 })
  reduction: number;
  @UpdateDateColumn()
  updatedAt: Date;
  @CreateDateColumn()
  createdAt: Date;
}
