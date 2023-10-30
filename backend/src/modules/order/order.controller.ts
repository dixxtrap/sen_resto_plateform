import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { OrderAddPlate, OrderDto } from 'src/dto/order.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { LocalAuthGuard } from 'src/middleware/local_auth.guard';

@Controller('order')
@ApiTags('order')
export class OrderController {
  constructor(private service: OrderService) {}
  @Get('')
  getS() {
    return this.service.getS();
  }
 
  @Post('add_plate')
  addPlate(@Body() body: OrderAddPlate) {
    return this.service.addPlate(body);
  }
  @UseGuards(LocalAuthGuard)
  @ApiBearerAuth()
  @Get('user')
  getOrderByUser(@Req() decoded: Request) {
    return this.service.getOrderByUser(decoded['user']);
  }
  @Post()
  create(@Body() body: OrderDto) {
    return this.service.create(body);
  }
  @Get(':id')
  get(@Param('id') id: number) {
    return this.service.getById(id);
  }
}
