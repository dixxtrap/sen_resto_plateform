import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { HttpExceptionCode } from 'src/utils/http_exception_code';
import { Request, Response } from 'express';
import { WsCustomerService } from './customer.service';
import { LoginDto } from 'src/modules/security/security.dto';
import { LocalAuthGuard } from 'src/middleware/local_auth.guard';

@Controller('ws/customer')
export class WsCustomerController {
  constructor(private service: WsCustomerService) {}

  @Post('login')
  login(@Req() req: Request, @Body() body: LoginDto, @Res() res: Response) {
    return this.service.login({ body }).then((result) => {
      return res
        .cookie('access_token', `Bearer ${result.token}`)
        .json(result)
        .status(200);
    });
  }
  @Get('profile')
  @UseGuards(LocalAuthGuard)
  profile(@Req() req: Request) {
    return req.user;
  }
}
