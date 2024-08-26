import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { ApiTags } from '@nestjs/swagger';
import { RoleDto } from 'src/typeorm/role.entity';
import { RolePermissionDto } from 'src/typeorm/role_permissison.entity';
import { PermissionDto } from 'src/typeorm/permission.entity';
import { AuthenticatedGuard } from '../security/authenticated.guard';
import { Request } from 'express';
import { UserDto } from 'src/typeorm/user.entity';
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
    return this.service.update({ body, id });
  }
  

  @Get('by_id/:id')
  getById(@Param('id') id: number) {
    return this.service.getById({ id });
  }
  @Get('by_id/permsission/:id')
  getPermissionByRoleId(@Param('id') id: number) {
    return this.service.getPermissionById({ id });
  }
  @Get('all')
  @UseGuards(AuthenticatedGuard)
  getAll(@Req() req: Request) {
    const by = req.user as UserDto;
    return this.service.getAll({ by });
  }
}
