
import { Permission } from 'src/typeorm';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { ModuleModule } from '../module/module.module';
import { Module } from '@nestjs/common/decorators/modules/module.decorator';

@Module({
  imports: [ ModuleModule],
  controllers: [PermissionController],
  providers: [PermissionService],
  exports: [PermissionService],
})
export class PermissionModule {}
