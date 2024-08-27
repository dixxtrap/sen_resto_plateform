import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('administration')
@Controller('administration')
export class AppController {
  constructor(protected readonly appService: AppService) {}

  @Get()
  getHello() {
    // return this.appService.getHello();
  }
}
