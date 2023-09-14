import { ApiProperty } from '@nestjs/swagger';
import { PermissionDto } from './permission.dto';

export class RoleDto {
  @ApiProperty() name: string;
  @ApiProperty() scope: string;
  @ApiProperty() createdAt?: Date;
  @ApiProperty() updatedAT?: Date;
}

export class PermissionRoleDto {
  @ApiProperty() id: number;
  @ApiProperty() roleId: number;
  @ApiProperty() isActive: boolean;
  @ApiProperty() permissionId: number;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}
