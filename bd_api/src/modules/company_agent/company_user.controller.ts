import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CompanyUserService } from './company_user.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CompanyUserDto,
  CompanyUserDtoGet,
  CompanyUserDtoUpdate,
} from 'src/dto/company_user.dto';
@ApiTags('company_agent')
@Controller('company_agent')
export class CompanyUserController {
  constructor(private service: CompanyUserService) {}
  @Get('')
  @ApiResponse({ type: [CompanyUserDtoGet], status: 200 })
  getS() {
    return this.service.getS();
  }
  @Get(':id')
  @ApiResponse({ type: CompanyUserDtoGet, status: 200 })
  get(@Param('id') id: number) {
    return this.service.get(id);
  }
  @Post()
  @ApiResponse({ type: CompanyUserDtoGet, status: 200 })
  create(@Body() item: CompanyUserDto) {
    return this.service.create(item);
  }
  @Put(':id')
  @ApiResponse({
    type: () => {
      return { affected: 0 };
    },
    status: 200,
  })
  update(@Param('id') id: number) {
    return this.service.update(id);
  }
}
