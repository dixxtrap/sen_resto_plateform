import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CompanyRestaurantService } from '../company_restaurant/company.service';
import { CompanyRestaurantBaseDto } from 'src/typeorm/company_restaurant.entity';
import { fileInterCeptorImg } from 'src/utils/multer.config';
import { AuthenticatedGuard } from 'src/modules/security/authenticated.guard';
import { Request } from 'express';
import { UserDto } from 'src/typeorm/user.entity';

@Controller('company_restaurant')
@ApiTags('company_restaurant')
export class CompanyRestaurantController {
  constructor(private service: CompanyRestaurantService) {}
  @Get('all')
  getAll() {
    return this.service.getAll();
  }
  @Get('byId/:id')
  getById(@Param('id') id: number) {
    return this.service.getById({ id });
  }
  @Post('create')
  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(fileInterCeptorImg)
  @UsePipes(new ValidationPipe({ transform: true }))
  create(
    @Body() body: CompanyRestaurantBaseDto,
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file);
    body.imagePath = file?.filename ?? null;
    const by = req.user as UserDto;
    return this.service.create({ body, by });
  }
  @Put('update/:id')
  @UseInterceptors(fileInterCeptorImg)
  update(
    @Body() body: CompanyRestaurantBaseDto,
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file);
    if (file) body.imagePath = file?.path ?? null;
    return this.service.update({ id, body, file });
  }
}
