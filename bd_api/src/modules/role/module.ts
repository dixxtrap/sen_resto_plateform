import { Module } from '@nestjs/common';
import { RoleService } from './service';
import { RoleController } from './controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionRole, Role } from 'src/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Role, PermissionRole])],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
