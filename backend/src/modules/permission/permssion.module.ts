import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from 'src/typeorm';
import { PermissionController } from './permission.controller';
import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule {}