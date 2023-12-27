import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { RoleService } from './role.service';
import { ApiTags } from '@nestjs/swagger';
import { RoleDto } from 'src/typeorm/role.entity';
import { RolePermissionDto } from 'src/typeorm/role_permissison.entity';
import { PermissionDto } from 'src/typeorm/permission.entity';
@Controller('role')
@ApiTags('role')
export class RoleController {
  constructor(private service: RoleService) {}
  @Post('create')
  create(@Body() body: RoleDto) {
    console.log('-------------------create role------------------');
    return this.service.create({ body });
  }
  @Put('update/:id')
  update(
    @Body() body: RoleDto,
    @Body('permissions') permissions: RolePermissionDto[],
    @Param('id') id: number,
  ) {
    return this.service.update({ body, id, permissions });
  }
  @Put('byId/addMultiplePermission/:id')
  addMultiplePermission(
    @Body() permissions: PermissionDto[],
    @Param('id') id: number,
  ) {
    return this.service.addMultiplePermission({ roleId: id, permissions });
  }
  @Put('byId/removeMultiplePermission/:id')
  removeMultiplePermission(
    @Body() permissions: RolePermissionDto[],
    @Param('id') id: number,
  ) {
    return this.service.removeMultiplePermission({ roleId: id, permissions });
  }
  @Get('byId/:id')
  getById(@Param('id') id: number) {
    return this.service.getById({ id });
  }
  @Get('byId/permsission/:id')
  getPermissionByRoleId(@Param('id') id: number) {
    return this.service.getPermissionById({ id });
  }
  @Get('all')
  getAll() {
    return this.service.getAll();
  }
}
