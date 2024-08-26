import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ModuleService } from './module.service';
import { ModuleEntityDto } from 'src/typeorm/module.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('module')
@ApiTags('module')
export class ModuleController {
  constructor(private service: ModuleService) {}
  @Get('initialize')
  initialize() {
    return this.service.initialTable();
  }
  @Post('create')
  create(@Body() body: ModuleEntityDto) {
    return this.service.create(body);
  }
  @Put(':id')
  update(@Param('id') id: number, @Body() body: ModuleEntityDto) {
    return this.service.update({ id, body });
  }
  @Get('all')
  get() {
    return this.service.get();
  }
}
