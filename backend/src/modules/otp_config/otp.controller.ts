import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OtpConfigService } from './otp.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticatedGuard } from '../security/authenticated.guard';
import { Request } from 'express';
import { UserDto } from 'src/typeorm/user.entity';
import { OtpConfigDto } from 'src/typeorm/otp_config';
@Controller('otp_config')
@ApiTags('otp_config')
export class OtpConfigController {
  constructor(private service: OtpConfigService) {}
  @Get('all')
  @UseGuards(AuthenticatedGuard)
  getAll() {
    return this.service.getAll();
  }
  @Get('by_id/:id')
  @UseGuards(AuthenticatedGuard)
  getById(@Param('id') id: number) {
    return this.service.getById({ id });
  }
  @Put('create/:id')
  @UseGuards(AuthenticatedGuard)
  create(@Req() req: Request, @Body() body: OtpConfigDto) {
    const by = req.user as UserDto;
    return this.service.create({ by, body });
  }
  @Put('update/:id')
  @UseGuards(AuthenticatedGuard)
  updateById(
    @Param('id') id: number,
    @Req() req: Request,
    @Body() body: OtpConfigDto,
  ) {
    const by = req.user as UserDto;
    return this.service.update({ id, by, body });
  }
}
