import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { CustomerDto } from 'src/typeorm/customer.entity';

@Controller('customer')
@ApiTags('customer')
export class CustomerController {
  constructor(private service: CustomerService) {}
  @Get('all')
  getAll() {
    return this.service.getAll();
  }
  @Get('by_id/:id')
  getById(@Param('id') id: number) {
    return this.service.getById({ id });
  }
  @Post('create')
  create(@Body() body: CustomerDto) {
    return this.service.create({ body });
  }
  @Put('update/:id')
  update(@Body() body: CustomerDto, @Param('id') id: number) {
    return this.service.update({ id, body });
  }
}
