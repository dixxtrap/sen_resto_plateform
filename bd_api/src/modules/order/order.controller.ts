import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { OrderDto } from 'src/dto/order.dto';

@Controller('order')
@ApiTags('order')
export class OrderController {
  constructor(private service: OrderService) {}
  @Get('')
  getS() {
    return this.service.getS();
  }
  @Get(':id')
  get(@Param('id') id: number) {
    return this.service.getById(id);
  }
  @Post()
  create(@Body() body: OrderDto) {
    return this.service.create(body);
  }
}
