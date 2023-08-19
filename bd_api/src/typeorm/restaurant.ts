import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Company } from './company';
import { FileDocument, RestaurantContact } from '.';
import { FileDocumentDto } from 'src/dto/file.dto';

@Entity()
@Index(['name', 'companyId'], { unique: true, nullFiltered: true })
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar')
  name: string;
  @Column('varchar', { length: 30 })
  email: string;
  @Column('int', { nullable: true })
  companyId: number;
  @Column('varchar')
  address: string;
  @Column('varchar', { length: 100, default: 'Dakar' })
  city: string;
  @Column('varchar', { length: 100, default: 'Senegal' })
  country: string;
  @Column('varchar', { length: 20 })
  postal_code: string;
  @Column('varchar', { length: 20 })
  phone: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column('float', { default: 0.0 })
  laltitude: number;
  @Column('float', { default: 0.0 })
  longitude: number;
  @Column('bool', { default: false })
  isDelecetd: boolean;
  @OneToOne(() => FileDocument, {
    cascade: true,
    onUpdate: 'NO ACTION',
    nullable: true,
  })
  @JoinColumn()
  profile: FileDocument;
  @ManyToOne(() => Company, (company) => company.restaurants, {
    onDelete: 'SET NULL',
    onUpdate: 'SET NULL',
    nullable: true,
  })
  company: Company;
  @OneToMany(() => RestaurantContact, (rest) => rest.restaurant)
  contact: RestaurantContact;
  @Column({ type: 'time' })
  openingTime: string;

  @Column({ type: 'time' })
  closingTime: string;
}
