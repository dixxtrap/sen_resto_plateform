import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CompanyRestaurantService } from '../company_restaurant/company.service';
import { CompanyRestaurantBaseDto } from 'src/typeorm/company_restaurant.entity';
import { fileInterCeptorImg } from 'src/utils/multer.config';

@Controller('company_restaurant')
@ApiTags('company_restaurant')
export class CompanyRestaurantController {
  constructor(private service: CompanyRestaurantService) {}
  @Get('all')
  getAll() {
    return this.service.getAll();
  }
  @Post('create')
  @UseInterceptors(fileInterCeptorImg)
  create(
    @Body() body: CompanyRestaurantBaseDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file);
    body.imagePath = file?.filename ?? null;
    return this.service.create({ body });
  }
  @Put('update/:id')
  @UseInterceptors(fileInterCeptorImg)
  update(
    @Body() body: CompanyRestaurantBaseDto,
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file);
    body.imagePath = file?.path ?? null;
    return this.service.update({ id, body });
  }
}
