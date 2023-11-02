import { Controller, Get, Param, Query } from '@nestjs/common';
import { WebService } from './service';
import { ApiTags } from '@nestjs/swagger';
import { IPagination } from 'src/dto/pagination';

@Controller('web')
@ApiTags('web')
export class WebController {
  constructor(private service: WebService) {}
  @Get('plate')
  getPlates(@Query() filter: IPagination) {
    return this.service.getPlate(filter);
  }
}
