import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

import { CategoryService } from './category.service';
import { CategoryDto } from 'src/typeorm/category.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('category')
@ApiTags('category')
export class CategoryController {
  constructor(private service: CategoryService) {}
  @Get('all')
  getAll() {
    return this.service.get();
  }
  @Get('all_without_child')
  getAllWithoutChild() {
    return this.service.getAll();
  }
  @Post('create')
  create() {
    return 'create';
  }
  @Put('update/:id')
  update(@Body() body: CategoryDto, @Param('id') id: number) {
    return this.service.update({ id, body });
  }
}
