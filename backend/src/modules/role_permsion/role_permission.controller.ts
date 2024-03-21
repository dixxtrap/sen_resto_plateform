import { Body, Controller, Get, Post } from '@nestjs/common';
import { RolePermissionService } from './role_permission.service';
import { ApiTags } from '@nestjs/swagger';
import { RolePermissionDto } from 'src/typeorm/role_permissison.entity';
@Controller('role_permission')
@ApiTags('role_permission')
export class RolePermissionController {
  constructor(private serrvice: RolePermissionService) {}
  @Post('create')
  create(@Body() body: RolePermissionDto) {
    return this.serrvice.create({ body });
  }
  @Get('init')
  init() {
    return this.serrvice.initroleAdmin();
  }
  @Post('update')
  update(@Body() body: RolePermissionDto) {
    return this.serrvice.update({ body });
  }
}
