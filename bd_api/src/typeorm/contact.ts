import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar', { length: 20 })
  firstname: string;
  @Column('varchar', { length: 20 })
  lastname: string;
  @Column('varchar', { length: 20 })
  email: string;
  @Column('varchar', { length: 20 })
  telephhone: string;
  @Column('varchar', { length: 20, nullable: true })
  adress: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
