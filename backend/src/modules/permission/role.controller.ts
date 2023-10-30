// import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
// import { PermissionService } from './permission.service';
// import { PermissionRoleDto, RoleDto } from 'src/dto/role.dto';
// import { ApiBody, ApiTags } from '@nestjs/swagger';
// @ApiTags('role')
// @Controller('role')
// export class RoleController {
//   constructor(
//     private permissionService: PermissionService,
  
//   ) { }
//   @Post()
//   create(@Body() roleDto: RoleDto) {
//     return this.permissionService.createRole(roleDto);
//   }
//   // @Post('role_permission')
//   // createRole(@Body() role:Role) {
//   //   return this.permissionService.createRolePermission(rolePermission);
//   // }
//   @Post('role_permissions')
//   @ApiBody({ type: [PermissionRoleDto] })
//   // async createRolePermissions(@Body() permissionRoles: [PermissionRoleDto]) {
//   //   return this.permissionService.createRolePermissions(permissionRoles);
//   // }
//   @Get('')
//   async getRole() {
//     console.log('-----------------------get role----------------------');
//     return await this.permissionService.getRole();
//   }
//   @Get('user')
//   async getRoleUser(@Query('role') search: string) {
//     console.log('-----------------------get role user----------------------');
//     return await this.permissionService.getRoleUser(search);
//   }
//   @Get('permission/:id')
//   async getPermission(@Param('id') id: number) {
//     console.log(
//       '-----------------------get role  permission----------------------',
//     );
//     return await this.permissionService.getRolePermission(id);
//   }
// }
