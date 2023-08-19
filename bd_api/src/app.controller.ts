import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { CompanyDto } from './dto/company.dto';
@ApiTags('administration')
@Controller('administration')
export class AppController {
  constructor(protected readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('company')
  createCompany(@Body() company: CompanyDto) {
    return this.appService.companyService.createCompany(company);
  }
}
