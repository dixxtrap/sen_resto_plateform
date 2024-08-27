import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/typeorm';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { RolePermissionModule } from '../role_permsion/role_permission.module';

@Module({
  imports: [ RolePermissionModule],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
