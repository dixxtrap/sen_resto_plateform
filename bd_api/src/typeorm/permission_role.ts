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
import { Permission, Role, User } from './';
 
@Entity({ orderBy: { permissionId: 'ASC' } })
@Index(['role', 'permission'], { unique: true })
export class PermissionRole {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  permissionId: number;
  @Column()
  roleId: number;
  @ManyToOne(() => Permission, (p) => p.permissionRole)
  permission: Permission;
  @ManyToOne(() => Role, (r) => r.permissionRole)
  role: Role;
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
