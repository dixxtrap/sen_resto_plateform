import { Controller, Get } from '@nestjs/common';
import { WsBannerService } from './banner.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('ws/banner')
@ApiTags('ws/banner')
export class WsBannerController {
  constructor(private service: WsBannerService) {}
  @Get('all')
  getAll() {
    return this.service.getAll();
  }
}
