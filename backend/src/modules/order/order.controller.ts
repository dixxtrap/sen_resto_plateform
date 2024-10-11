import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { AuthenticatedGuard } from '../security/authenticated.guard';
import { UserDto } from 'src/typeorm/user.entity';
import { Request } from 'express';
import { CurrentUser } from 'src/annotations/current_user';
import { OrderStatus } from 'src/typeorm/order.entity';
@Controller('order')
@ApiTags('order')
export class OrderController {
  constructor(private service: OrderService) {}
  @Get('all')
  @UseGuards(AuthenticatedGuard)
  getAll(@CurrentUser() by: UserDto) {
    return this.service.getAll({ by });
  }

  @Put('change_status/:id')
  @UseGuards(AuthenticatedGuard)
  changeStatus(
    @Param('id') id: number,
    @Body('status') status: OrderStatus,
    @CurrentUser() by: UserDto,
  ) {
    return this.service.changeStatus({ id, status, by });
  }
}
