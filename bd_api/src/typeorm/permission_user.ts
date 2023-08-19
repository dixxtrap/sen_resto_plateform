import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinTable,
  PrimaryGeneratedColumn,
  Index,
  ManyToMany,
  ManyToOne,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Permission, User } from './';

@Entity()
export class PermissionUser {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Permission, (p) => p.permissionUser, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  permission: Permission[];
  @ManyToOne(() => User, (u) => u.permissionUser, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  user: User[];
  @ManyToOne(() => User, { cascade: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'createById' })
  createBy: User;
  @Column('bool', { default: 1 })
  isActive: boolean;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
