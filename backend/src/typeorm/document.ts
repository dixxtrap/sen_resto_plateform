import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({})
export class FileDocument {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column({ nullable: true })
  fieldname: string;
  @Column({ nullable: true })
  originalname: string;
  @Column({ nullable: true })
  encoding: string;
  @Column({ nullable: true })
  mimetype: string;
  @Column({ nullable: true })
  destination: string;
  @Column({ nullable: true })
  filename: string;
  @Column({ nullable: true })
  path: string;
  @Column({ default: 0 })
  size: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
