
import { ProductService } from './product.service';
import { ProductDto } from 'src/typeorm/product.entity';
import { Request } from 'express';
import { UserDto } from 'src/typeorm/user.entity';
import { AuthenticatedGuard } from '../security/authenticated.guard';
import { ApiTags } from '@nestjs/swagger';
import { HttpExceptionCode } from 'src/utils/http_exception_code';
import { Controller } from '@nestjs/common/decorators/core/controller.decorator';
import { Get, Post, Put } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator';
import { fileInterCeptorImg } from 'src/utils/multer.config';
import { Body, Param, Req, UploadedFile } from '@nestjs/common/decorators/http/route-params.decorator';
import { CurrentUser } from 'src/annotations/current_user';

@Controller('product')
@ApiTags('product')
export class ProductController {
  constructor(private service: ProductService) {}
  @Post('create')
  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(fileInterCeptorImg)
  create(@Body() body: ProductDto, @CurrentUser() by: UserDto, @UploadedFile() file: Express.Multer.File,) {

    return this.service.create({ body, by, file });
  }
  @Get('refetch')
  @UseGuards(AuthenticatedGuard)
  refetch() {
    return HttpExceptionCode.SUCCEEDED;
  }
  @Get('all')
  @UseGuards(AuthenticatedGuard)
get(@CurrentUser() by:UserDto) {
    return  this.service.getAll({by});
  }
  

 
  @Put('management_by_shop/:id')
  @UseGuards(AuthenticatedGuard)
  createProductManagementById(
    @Req() req: Request,
    @Body("productIds") body: Array<number>,
    @Param('id') id: number,
  ) {
    const by = req.user as UserDto;
    return this.service.updateManyManagement({ by, body, partnerId: id });
  }
  @Put('management_by_id/:id')
  @UseGuards(AuthenticatedGuard)
  updateManagementById(
    @Req() req: Request,
    @Body("productIds") body: Array<number>,
    @Param('id') id: number,
  ) {
    const by = req.user as UserDto;
    return this.service.updateManyManagement({ by, body, partnerId: id });
  }
  @Get('management_by_shop/:id')
  @UseGuards(AuthenticatedGuard)
  getAvailableProductManagementById(
    @Req() req: Request,
    @Param('id') id: number,
  ) {
    const by = req.user as UserDto;
    return this.service.getByShop({ by, partnerId: id });
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
