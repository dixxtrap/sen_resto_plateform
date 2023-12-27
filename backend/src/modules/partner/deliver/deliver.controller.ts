import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeliverService } from './deliver.service';
import { DeliverDto } from 'src/typeorm/deliver.entity';

@Controller('deliver')
@ApiTags('deliver')
export class DeliverController {
  constructor(private service: DeliverService) {}
  @Get('all')
  getAll() {
    return this.service.getAll();
  }
  @Post('create')
  create(@Body() body: DeliverDto) {
    return this.service.create({ body });
  }
  @Put('update/:id')
  update(@Body() body: DeliverDto, @Param('id') id: number) {
    return this.service.update({ id, body });
  }
}
