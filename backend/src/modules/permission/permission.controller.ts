import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { ApiTags } from '@nestjs/swagger';
import { Permission, Role } from 'src/typeorm';
import { PermissionDto } from 'src/dto/permission.dto';
@ApiTags('Permission')
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}
  @Post('')
  create(@Body() body: PermissionDto) {
    return this.permissionService.createPermission(body);
  }
  @Get('')
  async getPermissions(): Promise<Permission[]> {
    return await this.permissionService.getPermissions();
  }
}
