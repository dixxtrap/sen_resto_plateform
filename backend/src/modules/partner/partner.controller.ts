import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CompanyRestaurantBase,
  CompanyRestaurantBaseDto,
} from 'src/typeorm/company_restaurant.entity';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { Repository } from 'typeorm';
import { PartnerService } from './partner.service';
import { AuthenticatedGuard } from '../security/authenticated.guard';
import { Request } from 'express';
import { UserDto } from 'src/typeorm/user.entity';

@Controller('partner')
@ApiTags('partner')
export class PartnerController {
  constructor(private service: PartnerService) {}
  @Get('children')
  @UseGuards(AuthenticatedGuard)
  getAllChildreen(@Req() req: Request) {
    return this.service.getAll(req.user as UserDto);
  }
}
