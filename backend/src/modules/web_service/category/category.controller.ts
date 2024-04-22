import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WsCategoryService } from './category.service';

@Controller('ws/category')
@ApiTags('ws/category')
export class WsCategoryController {
  constructor(private service: WsCategoryService) {}
  @Get('all')
  getAll() {
    return this.service.getAll();
  }
}
