import { CustomerDto } from './../../../typeorm/customer.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WsOrderService } from './order.service';
import { AddOrderDto, OrderDto, OrderStatus } from 'src/typeorm/order.entity';
import { LocalAuthGuardCustomer } from 'src/middleware/local_auth.guard';
import { Request } from 'express';
import { CurrentUser } from 'src/annotations/current_user';
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
  @Put('confirm_status/:id')
  @UseGuards(LocalAuthGuardCustomer)
  changeStatus(@Param('id') id: number, @Req() req :Request) {
    const by= req.user as CustomerDto;
     console.log("==================update successFully================");
    return this.service.confirmOrder({ id, by});
  }
  @Put('update/:id')
  @UseGuards(LocalAuthGuardCustomer)
  update(@Param('id') id: number, @CurrentUser() user :CustomerDto,@Body() body:OrderDto) {
   
    return this.service.update({ id,body});
  }
  @Delete('delete/:id')
  @UseGuards(LocalAuthGuardCustomer)
  deleteOrder(@Param('id') id: number, @Req() req :Request) {
    const by= req.user as CustomerDto;
    return this.service.delete({ id});
  }
  @Post('product/add')
  @UseGuards(LocalAuthGuardCustomer)
  addProduct(@Body() body: AddOrderDto, @Req() req: Request) {
    const by = req.user as CustomerDto;
    body.customerId = by.id;
    return this.service.addProductToOrder({ body: body, by });
  }
}
