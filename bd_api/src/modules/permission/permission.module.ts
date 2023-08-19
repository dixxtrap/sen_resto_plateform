import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role, Permission, PermissionUser, PermissionRole } from 'src/typeorm';
import { PermissionService } from './permission.service';
import { permissions } from 'src/data/permission.data';
import { PermissionController } from './permission.controller';
import { RoleController } from './role.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Permission,
      Role,
      PermissionUser,
      PermissionRole,
    ]),
  ],
  controllers: [PermissionController, RoleController],
  providers: [PermissionService],
  exports: [PermissionService],
})
export class PermissionModule {}
