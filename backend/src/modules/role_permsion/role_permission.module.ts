import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermission } from 'src/typeorm/role_permissison.entity';
import { RolePermissionController } from './role_permission.controller';
import { RolePermissionService } from './role_permission.service';
import { PermissionModule } from '../permission/permssion.module';

@Module({
  imports: [TypeOrmModule.forFeature([RolePermission]), PermissionModule],
  controllers: [RolePermissionController],
  providers: [RolePermissionService],
  exports: [RolePermissionService],
})
export class RolePermissionModule {}
