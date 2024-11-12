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
import { CurrentUser } from 'src/annotations/current_user';
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
  getAll(@CurrentUser() by: UserDto) {
    return this.service.get({ by });
  }
  @Get('all_for_admin')
  @UseGuards(AuthenticatedGuard)
  @ApiSecurity('session')
  getAllUser(@Req() req: Request) {
    return this.service.getAllUser( );
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
    @CurrentUser() by: UserDto
  ) {
    
    return this.service.update({ id, body, by });
  }
  @Post('create')
  @UseGuards(AuthenticatedGuard)
  create(@Body() body: CreateUserDto, @CurrentUser() by: UserDto) {
    
    return this.service.create({ body, by });
  }
}
