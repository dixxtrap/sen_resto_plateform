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
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RestaurantDto } from 'src/dto/restaurant.dto';
import { CompanyService } from './company.service';
import { FileDocumentDto } from 'src/dto/file.dto';
import { LocalAuthGuard } from 'src/middleware/local_auth.guard';
import { Request } from 'express';
@ApiTags('restaurant')
@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(LocalAuthGuard)
  async createRestaurant(
    @Body() restaurant: RestaurantDto,
    @Req() req: Request,
  ) {
    // console.log(file);
    restaurant.profile = new FileDocumentDto();
    restaurant.companyId = req['user'].companyId;
    return await this.companyService.createRestaurant(restaurant);
  }
  @Get('')
  @ApiBearerAuth()
  @UseGuards(LocalAuthGuard)
  async getRestaurants(@Req() req: Request) {
    return await this.companyService.getRestaurants(req['user']);
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
