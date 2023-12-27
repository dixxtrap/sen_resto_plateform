import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RestaurantService } from "./restaurant.service";
import { CompanyRestaurantBaseDto } from "src/typeorm/company_restaurant.entity";

@Controller("restaurant")
@ApiTags("restaurant")
export class RestaurantController{
constructor(private service:RestaurantService){}
@Get('all')
  getAll() {
    return this.service.getAll();
  }
  @Post('create')
  create(@Body() body: CompanyRestaurantBaseDto) {
    return this.service.create({ body });
  }
  @Put('update/:id')
  update(@Body() body: CompanyRestaurantBaseDto, @Param('id') id: number) {
    return this.service.update({ id, body });
  }
}