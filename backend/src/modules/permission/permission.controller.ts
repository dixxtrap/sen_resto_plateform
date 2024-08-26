import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { ApiTags } from '@nestjs/swagger';
import { PermissionDto } from 'src/typeorm/permission.entity';

@Controller('permission')
@ApiTags('permission')
export class PermissionController {
  constructor(private service: PermissionService) {}
  @Post('create')
  create(@Body() body: PermissionDto) {
    console.log('------------------create permissiions(------------------');
    return this.service.create({ body });
  }
  @Get('all')
  getAll() {
    return this.service.getAll();
  }
  @Get('init')
  getInit() {
    return this.service.initPermission();
  }
  @Put('update/:id')
  update(@Body() body: PermissionDto, @Param('id') id: number) {
    return this.service.update({ body, id });
  }
}
