import {
  Controller,
  Get,
  Post,
  Param,
  Put,
  Body,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CoorporateService } from './coorporate.service';
import { CompanyRestaurantBaseDto } from 'src/typeorm/company_restaurant.entity';
import { AuthenticatedGuard } from 'src/modules/security/authenticated.guard';
import { UserDto } from 'src/typeorm/user.entity';
import { fileInterCeptorImg } from 'src/utils/multer.config';
import { Request } from 'express';
@Controller('coorporate')
@ApiTags('coorporate')
export class CoorporateController {
  constructor(private service: CoorporateService) {}
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
