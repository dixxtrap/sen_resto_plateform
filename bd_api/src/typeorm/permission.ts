import {
  Column,
  Entity,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
@Index(['sousModule', 'type'], { unique: true })
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  sousModule: string;
  @Column('enum', { enum: ['CREATE', 'READ', 'UPDATE', 'DELETE'] })
  type: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column('bool', { default: true })
  isActive: boolean;
}
