import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TagService } from './tag.service';
import { ApiResponse } from '@nestjs/swagger';
import { TagDto } from 'src/dto/tag.dto';

@Controller('tag')
export class TagController {
  constructor(private service: TagService) {}
  @Get('')
  @ApiResponse({ type: [TagDto], status: 200 })
  getS() {
    return this.service.getS();
  }
  @Get(':id')
  @ApiResponse({ type: TagDto, status: 200 })
  get(@Param('id') id: number) {
    return this.service.get(id);
  }
  @Post()
  @ApiResponse({ type: TagDto, status: 200 })
  create(@Body() item: TagDto) {
    return this.service.create(item);
  }
  @Put(':id')
  @ApiResponse({
    type: () => {
      return { affected: 0 };
    },
    status: 200,
  })
  update(@Param('id') id: number, @Body() item: TagDto) {
    return this.service.update({ id, ...item });
  }
}
