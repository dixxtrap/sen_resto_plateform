import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PermissionUser } from './';
import { PermissionRole } from './permission_role';

@Entity()
@Index(['sousModule', 'type'], { unique: true })
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToMany(() => PermissionUser, (pU) => pU.permission)
  permissionUser: PermissionUser;
  @OneToMany(() => PermissionRole, (pU) => pU.permission)
  permissionRole: PermissionRole;
  @Column('varchar')
  sousModule: string;
  @Column('enum', { enum: ['CREATE', 'READ', 'UPDATE', 'DELETE'] })
  type: string;
  @Column('bool', { default: true })
  isActive: boolean;
}
