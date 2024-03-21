import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from 'src/typeorm';
import { PermissionController } from './permission.controller';
import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { ModuleModule } from '../module/module.module';

@Module({
  imports: [TypeOrmModule.forFeature([Permission]), ModuleModule],
  controllers: [PermissionController],
  providers: [PermissionService],
  exports: [PermissionService],
})
export class PermissionModule {}
