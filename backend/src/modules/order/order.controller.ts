import { Controller, Get, Param, Put, Req, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { OrderService } from "./order.service";
import { AuthenticatedGuard } from "../security/authenticated.guard";
import { UserDto } from "src/typeorm/user.entity";
import {Request} from 'express'
@Controller("order")
@ApiTags("order")
export class OrderController{
    constructor(private service:OrderService){}
        @Get('all')
        getAll(){
            return this.service.getAll()
        }

     @Put('consfirm_status/:id')
  @UseGuards(AuthenticatedGuard)
  changeStatus(@Param('id') id: number, @Req() req :Request) {
    const by= req.user as UserDto;
    return this.service.preparingStatus({ id, by});
  }
}