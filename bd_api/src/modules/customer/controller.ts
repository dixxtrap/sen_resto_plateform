import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomerService } from './service';
import { CustomerDto } from 'src/dto/customer.dto';

@Controller('customer')
@ApiTags('Customer')
export class CustomerController {
  constructor(private service: CustomerService) {}
  @Get()
  getS() {
    return this.service.getS();
  }
  @Get(':id')
  get(@Param('id') id: number) {
    return this.service.get(id);
  }
  @Get('token/:phone')
  getByPhone(@Param('phone') phone: string) {
    return this.service.getPhone(phone);
  }
  @Post()
  post(@Body() item: CustomerDto) {
    return this.service.post(item);
  }
  @Put(':id')
  update(@Param('id') id: number, @Body() item: CustomerDto) {
    return this.service.update(id, item);
  }
}
