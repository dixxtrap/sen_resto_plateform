import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
import { Permission, Role } from './';

@Entity('role_permission_permission', { orderBy: { permissionId: 'ASC' } })
export class PermissionRole {
  @PrimaryColumn()
  permissionId: number;
  @PrimaryColumn()
  roleId: number;
  @Column('bool', { default: true })
  isActive: boolean;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
