import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { RestaurantUserService } from './restaurant_user.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  RestaurantUserDto,
  RestaurantUserDtoGet,
} from 'src/dto/restaurant_user';
@ApiTags('restaurant_agent')
@Controller('restaurant_agent')
export class RestaurantUserController {
  constructor(private service: RestaurantUserService) {}
  @Get('')
  @ApiResponse({ type: [RestaurantUserDtoGet], status: 200 })
  getS() {
    return this.service.getS();
  }
  @Get(':id')
  @ApiResponse({ type: RestaurantUserDtoGet, status: 200 })
  get(@Param('id') id: number) {
    return this.service.get(id);
  }
  @Post()
  @ApiResponse({ type: RestaurantUserDtoGet, status: 200 })
  create(@Body() item: RestaurantUserDto) {
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
