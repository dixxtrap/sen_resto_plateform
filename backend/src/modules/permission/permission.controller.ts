import { Controller, Get, Query } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { ApiTags } from '@nestjs/swagger';
import { Permission, Role } from 'src/typeorm';
@ApiTags('Permission')
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get('')
  async getPermissions(): Promise<Permission[]> {
    return await this.permissionService.getPermissions();
  }
}
