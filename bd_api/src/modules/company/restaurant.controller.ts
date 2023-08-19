import {
  Controller,
  Body,
  Post,
  Put,
  Query,
  Get,
  UploadedFile,
  ParseFilePipe,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RestaurantDto } from 'src/dto/restaurant.dto';
import { CompanyService } from './company.service';
import { FileDocumentDto } from 'src/dto/file.dto';
@ApiTags('restaurant')
@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async createRestaurant(@Body() restaurant: RestaurantDto) {
    // console.log(file);
    restaurant.profile = new FileDocumentDto();
    return await this.companyService.createRestaurant(restaurant);
  }
  @Get('')
  async getRestaurants() {
    return await this.companyService.getRestaurants();
  }
  @Get('particulier')
  async getRestaurantsParticulier() {
    return await this.companyService.getRestaurantParticulier();
  }
  @Get(':id')
  async get(@Param('id') id: number) {
    return this.companyService.getRestaurant(id);
  }

  @Put('/:id')
  async updtaeRestaurant(
    @Param('id') id: number,
    @Body() restaurant: RestaurantDto,
  ) {
    return await this.companyService.updateRestaurant(id, restaurant);
  }
}
