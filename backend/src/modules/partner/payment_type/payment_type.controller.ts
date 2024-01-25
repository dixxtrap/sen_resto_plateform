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
import { PaymentTypeService } from './payment_type.service';
import { AuthenticatedGuard } from 'src/modules/security/authenticated.guard';
import { CompanyRestaurantBaseDto } from 'src/typeorm/company_restaurant.entity';
import { UserDto } from 'src/typeorm/user.entity';
import { fileInterCeptorImg } from 'src/utils/multer.config';
import { Request } from 'express';
import { PaymentTypeDto } from 'src/typeorm/payment_type.entity';
@Controller('payment_type')
@ApiTags('payment_type')
export class PaymentTypeController {
  constructor(private service: PaymentTypeService) {}
  @Get('all')
  getAll() {
    return this.service.getAll();
  }
  @Get('by_id/:id')
  getById(@Param('id') id: number) {
    return this.service.getById({ id });
  }
  @Post('create')
  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(fileInterCeptorImg)
  create(
    @Body() body: PaymentTypeDto,
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file);
    body.imagePath = file?.filename ?? null;
    const by = req.user as UserDto;
    return this.service.create({ body, by });
  }
  @Put('by_id/:id')
  @UseInterceptors(fileInterCeptorImg)
  update(
    @Body() body: PaymentTypeDto,
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file);
    if (file) body.imagePath = file?.path ?? null;
    return this.service.update({ id, body });
  }
}
