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
import { UserService } from './user.service';
import { AuthenticatedGuard } from '../security/authenticated.guard';
import { Request } from 'express';
import { CreateUserDto, UserDto } from 'src/typeorm/user.entity';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private service: UserService) {}
  @Get('profile')
  @UseGuards(AuthenticatedGuard)
  getProfile(@Req() req: Request) {
    return req['user'];
  }
  @Get('all')
  @UseGuards(AuthenticatedGuard)
  @ApiSecurity('session')
  getAll(@Req() req: Request) {
    return this.service.get({ by: req.user as UserDto });
  }
  @Get('by_id/:id')
  getById(@Param('id') id: number) {
    return this.service.getById({ id });
  }
  @Put('update/:id')
  @UseGuards(AuthenticatedGuard)
  update(
    @Param('id') id: number,
    @Body() body: CreateUserDto,
    @Req() req: Request,
  ) {
    const by = req.user as UserDto;
    return this.service.update({ id, body, by });
  }
  @Post('create')
  @UseGuards(AuthenticatedGuard)
  create(@Body() body: CreateUserDto, @Req() req: Request) {
    const by = req.user as UserDto;
    return this.service.create({ body, by });
  }
}
