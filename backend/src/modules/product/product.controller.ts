import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from 'src/typeorm/product.entity';
import { Request } from 'express';
import { UserDto } from 'src/typeorm/user.entity';
import { AuthenticatedGuard } from '../security/authenticated.guard';
import { ApiTags } from '@nestjs/swagger';
import { HttpExceptionCode } from 'src/utils/http_exception_code';
import {
  ProductManagementDayDto,
  ProductManagementDto,
} from 'src/typeorm/product_management.entity';

@Controller('product')
@ApiTags('product')
export class ProductController {
  constructor(private service: ProductService) {}
  @Post('create')
  @UseGuards(AuthenticatedGuard)
  create(@Body() body: ProductDto, @Req() req: Request) {
    const by = req.user as UserDto;
    return this.service.create({ body, by });
  }
  @Get('refetch')
  refetch() {
    return HttpExceptionCode.SUCCEEDED;
  }
  @Get('protect/product_management')
  @UseGuards(AuthenticatedGuard)
  getProductManagement(@Req() req: Request) {
    const by = req.user as UserDto;
    return this.service.getProductMamangement(by);
  }
  @Put('protect/product_management_day')
  @UseGuards(AuthenticatedGuard)
  updateProductManagementDay(
    @Req() req: Request,
    @Body() body: ProductManagementDayDto[],
  ) {
    const by = req.user as UserDto;
    return this.service.updateManagementDay(body);
  }
  @Get('protect/by_id/product_management/:id')
  @UseGuards(AuthenticatedGuard)
  getProductManagementById(@Req() req: Request, @Param('id') id: number) {
    const by = req.user as UserDto;
    return this.service.getProductMamangementById({ by, id });
  }
  @Post('protect/by_id/add_multiple_product_management/:id')
  @UseGuards(AuthenticatedGuard)
  createProductManagementById(
    @Req() req: Request,
    @Body() body: ProductDto[],
    @Param('id') id: number,
  ) {
    const by = req.user as UserDto;
    return this.service.addMultiProductManagement({ by, body, partnerId: id });
  }
  @Get('protect/by_id/available/product_management/:id')
  @UseGuards(AuthenticatedGuard)
  getAvailableProductManagementById(
    @Req() req: Request,
    @Param('id') id: number,
  ) {
    const by = req.user as UserDto;
    return this.service.getAvailableProductForRestaurant({ by, partnerId: id });
  }
  @Get('weekday')
  getDay() {
    return this.service.getWeekDay();
  }
  @Get('by_id/:id')
  @UseGuards(AuthenticatedGuard)
  getProductById(@Param('id') id: number, @Req() req: Request) {
    const by = req.user as UserDto;
    return this.service.getProductById({ id, by });
  }
  @Put('update/by_id/:id')
  @UseGuards(AuthenticatedGuard)
  updateProduct(
    @Param('id') id: number,
    @Body() body: ProductDto,
    @Req() req: Request,
  ) {
    const by = req.user as UserDto;
    return this.service.update({ id, by, body });
  }
}
