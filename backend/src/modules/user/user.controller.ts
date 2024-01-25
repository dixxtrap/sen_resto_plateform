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

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}
  @Get('profile')
  @UseGuards(AuthenticatedGuard)
  getProfile(@Req() req: Request) {
    return req['user'];
  }
  @Get('all')
  getAll() {
    return this.service.get();
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
