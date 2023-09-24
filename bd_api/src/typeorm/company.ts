import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  Index,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Restaurant } from './restaurant';
import { User } from './user';
import { FileDocument } from './document';
@Entity()
@Index(['short_name', 'name'], { unique: true })
@Index(['name', 'country'], { unique: true })
export class Company {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar')
  name: string;
  @Column('varchar')
  short_name: string;
  @Column('varchar', { length: 30 })
  email: string;
  @Column('varchar', {nullable:true})
  description: string;
  @Column('varchar',{nullable:true})
  address: string;
  @Column('varchar', { length: 100, default: 'Dakar' })
  city: string;
  @Column('varchar', { length: 100, default: 'Senegal' })
  country: string;
  @Column('varchar', { length: 20, nullable: true })
  postal_code: string;
  @Column('varchar', { length: 20 })
  phone: string;
  @Column('double', { default: 0 })
  laltitude: number;
  @Column('double', { default: 0 })
  longitude: number;
  @Column('bool', { default: true })
  isActive: boolean;
  @Column('bool', { default: true })
  canPublish: boolean;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @OneToOne(() => FileDocument, {
    cascade: true,
    nullable: true,
    onUpdate: 'NO ACTION',
  
  })
  @JoinColumn()
  profile: FileDocument;
  @OneToMany(() => Restaurant, (restaurant) => restaurant.company, {
    cascade: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  restaurants: Restaurant[];
}
