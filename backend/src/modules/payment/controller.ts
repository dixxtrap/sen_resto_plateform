import { ApiTags } from '@nestjs/swagger';
import { PaymentService } from './service';
import { Controller, Get, Post, Put } from '@nestjs/common';
@ApiTags('payment')
@Controller('payment')
export class PaymentController {
  constructor(private service: PaymentService) {}
  @Get()
  getS() {
    return this.service.get();
  }
  @Get('getById/:id')
  getById() {
    return this.service.getById();
  }
  @Post('create')
  create() {
    return this.service.create();
  }
  @Put('update')
  update() {
    return this.service.update();
  }
}
