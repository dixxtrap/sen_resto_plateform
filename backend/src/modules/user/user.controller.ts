import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthenticatedGuard } from '../security/authenticated.guard';
import { Request } from 'express';

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
}
