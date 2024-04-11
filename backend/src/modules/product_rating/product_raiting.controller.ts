import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductRaitingService } from './product_raiting.service';
import {
  ProductRaitingIdDto,
  ProductRaitingDto,
} from 'src/typeorm/product_rating.entity';

@Controller('product_raiting')
@ApiTags('product_raiting')
export class ProductRaitingController {
  constructor(private service: ProductRaitingService) {}
  @Get('all')
  getAll() {
    return this.service.getAll();
  }
  @Get('by_id')
  getById(@Query() body: ProductRaitingIdDto) {
    return this.service.getById(body);
  }
  @Post('create')
  create(@Body() body: ProductRaitingDto) {
    return this.service.create({ body });
  }
  @Put('update/:id')
  update(@Param('id') id: number, @Body() body: ProductRaitingDto) {
    return this.service.update({ id, body }); 
  }
}
