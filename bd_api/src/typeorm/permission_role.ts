import { Entity, Index, JoinColumn, PrimaryColumn } from 'typeorm';
import { Permission, Role } from './';

@Entity('role_permission_permission', { orderBy: { permissionId: 'ASC' } })
export class PermissionRole {
  @PrimaryColumn()
  permissionId: number;
  @PrimaryColumn()
  roleId: number;
  @JoinColumn()
  permission: Permission;
  @JoinColumn()
  role: Role;
}
