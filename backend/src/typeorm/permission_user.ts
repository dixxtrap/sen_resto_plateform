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
  PrimaryColumn,
} from 'typeorm';
import { Permission, User } from '.';

@Entity('user_permission_permission')
export class PermissionUser {
  @PrimaryColumn()
  permissionId: number;
  @PrimaryColumn()
  userId: number;
  @JoinColumn()
  permission: Permission;
  @JoinColumn()
  user: User;
}
