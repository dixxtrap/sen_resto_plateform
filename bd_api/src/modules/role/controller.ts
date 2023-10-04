import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { RoleService } from './service';
import { RoleDto } from 'src/dto/role.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { PermissionDto } from 'src/dto/permission.dto';
@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(private service: RoleService) {}
  @Get()
  gets() {
    return this.service.getS();
  }
  @Post()
  post(@Body() body: RoleDto) {
    return this.service.post(body);
  }
  @Put(':id')
  update(@Param('id') id: number, @Body() body: RoleDto) {
    return this.service.update(id, body);
  }
  @Get('permission/:id')
  permission(@Param('id') id: number) {
    return this.service.get(id);
  }
  @Get('permission_user/:id')
  permissionUser(@Param('id') id: number) {
    return this.service.get(id);
  }
  @Get('noValidPermission/:id')
  getNoValidPermision(@Param('id') id: number) {
    return this.service.getNoValidPermision(id);
  }
  @Post('permissions/:id')
  @ApiBody({ type: () => [PermissionDto] })
  addPermission(@Param('id') id: number, @Body() body: [PermissionDto]) {
    return this.service.addPermission(id, body);
  }
  @Post('deletePermissions/:id')
  @ApiBody({ type: () => [PermissionDto] })
  removePermission(@Param('id') id: number, @Body() body: [PermissionDto]) {
    return this.service.deletePermission(id, body);
  }
}
