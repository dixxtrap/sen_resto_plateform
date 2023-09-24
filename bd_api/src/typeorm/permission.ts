import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
@Index(['sousModule', 'type'], { unique: true })
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar',)
  sousModule: string;
  @Column('enum', { enum: ['CREATE', 'READ', 'UPDATE', 'DELETE'] })
  type: string;
  @Column('bool', { default: true })
  isActive: boolean;
}
