import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WsOrderService } from './order.service';
import { AddOrderDto } from 'src/typeorm/order.entity';
import { LocalAuthGuardCustomer } from 'src/middleware/local_auth.guard';
import { Request } from 'express';
import { CustomerDto } from 'src/typeorm/customer.entity';
@Controller('ws/order')
@ApiTags('ws/order')
export class WsOrderController {
  constructor(private service: WsOrderService) {}
  @Get('bag')
  @UseGuards(LocalAuthGuardCustomer)
  getBag(@Req() req: Request) {
    const by = req.user as CustomerDto;
    return this.service.getBag({ by });
  }
  @Post('product/add')
  @UseGuards(LocalAuthGuardCustomer)
  addProduct(@Body() body: AddOrderDto, @Req() req: Request) {
    const by = req.user as CustomerDto;
    body.customerId = by.id;
    return this.service.addProductToOrder({ body: body, by });
  }
}
