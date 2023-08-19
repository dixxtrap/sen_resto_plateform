import {
  Body,
  Controller,
  Param,
  Get,
  Post,
  Put,
  Query,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { CompanyDto } from 'src/dto/company.dto';
import { CompanyContactDto } from 'src/dto/contact.dto';
import { RestaurantDto } from 'src/dto/restaurant.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}
  @Post()
  async createCompany(@Body() company: CompanyDto) {
    return this.companyService.createCompany(company);
  }
  // POST
  @Post('/add_restaurant')
  async addRestaurant(@Body() resto: RestaurantDto) {
    return this.companyService.createRestaurant(resto);
  }
  @Get('')
  getCompanys() {
    return this.companyService.getCompanys();
  }
  @Post('contact/:id')
  createContact(@Param('id') id: number, @Body() contact: CompanyContactDto) {
    contact.companyId = id;
    return this.companyService.createCompanyContact(contact);
  }
  @Post('create_with_restos')
  createCompanyWithReasto(@Body() company: CompanyDto) {
    return this.companyService.createCompany(company);
  }
  @Get('/:id')
  async getCompany(@Param('id') id: number) {
    return this.companyService.getCompany(id);
  }

  @Put('/:id')
  async updateCompany(@Param('id') id: number, @Body() company: CompanyDto) {
    company.id = id;
    console.log(company.id);
    return await this.companyService.updateCompany(company);
  }
  @Put('contact/:id')
  updateContact(@Param('id') id: number, @Body() contact: CompanyContactDto) {
    contact.companyId = id;
    return this.companyService.updateCompanyContact(id, contact);
  }

  @Delete('restaurant')
  deleteRestaurant(@Query('id') id: number) {
    return this.companyService.deleteRestaurant(id);
  }
}
