import { Column, Entity, Index, ManyToOne, PrimaryColumn } from 'typeorm';
import { Permission } from './permission.entity';
import { Role } from './role.entity';
import { ApiProperty } from '@nestjs/swagger';
import { CreationDetails } from './details.entity';

@Entity()
export class RolePermission {
  @ManyToOne(() => Permission, {})
  permission: Permission;
  @PrimaryColumn()
  permissionId: number;
  @ManyToOne(() => Role)
  role: Permission;
  @PrimaryColumn()
  roleId: number;
  @Column({ default: true })
  canUse: boolean;
  @Column({ default: true })
  canInherit: boolean;
  @Column({ default: true })
  isActive: boolean;
  @Column(() => CreationDetails)
  details: CreationDetails;
}

export class RolePermissionDto {
  @ApiProperty()
  permissionId?: number;
  @ApiProperty()
  roleId?: number;
  @ApiProperty()
  canUse: boolean;
  @ApiProperty()
  isActive?: boolean;
  @ApiProperty()
  canInherit: boolean;
}
