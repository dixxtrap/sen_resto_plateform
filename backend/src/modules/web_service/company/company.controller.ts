import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WsCompanyService } from './company.service';

@Controller('ws/company')
@ApiTags('ws/company')
export class WsCompanyController {
  constructor(private service: WsCompanyService) {}
  @Get('all')
  getAll() {
    return this.service.getAll();
  }
}
