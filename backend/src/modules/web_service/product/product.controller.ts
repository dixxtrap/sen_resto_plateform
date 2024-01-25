import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WsProductService } from './product.service';

@Controller('ws/product')
@ApiTags('ws/product')
export class WsProductController {
  constructor(private service: WsProductService) {}
  @Get('all')
  getALl() {
    return this.service.getAll();
  }
}
