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
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RestaurantService } from './restaurant.service';
import { CompanyRestaurantBaseDto } from 'src/typeorm/company_restaurant.entity';
import { fileInterCeptorImg } from 'src/utils/multer.config';
import { AuthenticatedGuard } from 'src/modules/security/authenticated.guard';
import { Request } from 'express';
import { UserDto } from 'src/typeorm/user.entity';

@Controller('restaurant')
@ApiTags('restaurant')
export class RestaurantController {
  constructor(private service: RestaurantService) {}
  @Get('all')
  @UseGuards(AuthenticatedGuard)
  getAll(@Req() req: Request) {
    const by = req.user as UserDto;
    return this.service.getAll({ by });
  }
  @Get('byId/:id')
  @UseGuards(AuthenticatedGuard)
  getById(@Param('id') id: number) {
    return this.service.getById({ id });
  }
  @Post('create')
  @UseGuards(AuthenticatedGuard)
  create(@Body() body: CompanyRestaurantBaseDto, @Req() req: Request) {
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
    if (file) body.imagePath = file?.path ?? null;
    return this.service.update({ id, body, file });
  }
}
