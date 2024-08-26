import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WsProductService } from './product.service';

@Controller('ws/product')
@ApiTags('ws/product')
export class WsProductController {
  constructor(private service: WsProductService) {}
  @Get('all')
  getAll() {
    return this.service.getAll();
  }
  @Get('company/:id')
  getAllByCompany(@Param('id') id: number) {
    return this.service.getAllByCompanyId({ id });
  }
  @Get('discounted') 
  getDiscounted() {
    return this.service.getDiscounted();
  }
}
