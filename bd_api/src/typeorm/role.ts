import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PermissionRole, User } from './';
import { UppercaseTransformer } from 'src/transformer/uppercase.transformer';

@Entity('role')
@Index(['scope', 'name'], { unique: true })
export class Role {
  @PrimaryGeneratedColumn('increment', { type: 'int' })
  id: number;
  @Column('enum', {
    transformer: new UppercaseTransformer(),
    enum: ['SUPER', 'RESTAURANT', 'COMPANY', 'DELIVER', 'CUSTOMER'],
  })
  scope: string;
  @Column('varchar', { length: 30 })
  name: string;
  @OneToMany(() => User, (u) => u.role)
  user: User[];
  @OneToMany(() => PermissionRole, (pU) => pU.role)
  permissionRole: PermissionRole[];
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
