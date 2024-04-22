import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { WsCustomerService } from './customer.service';
import { LoginDto } from 'src/modules/security/security.dto';
import { LocalAuthGuard } from 'src/middleware/local_auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { BaseResponse } from 'src/typeorm/response_base';
import { CustomerDto } from 'src/typeorm/customer.entity';
import { OtpVerificationDto } from 'src/typeorm/otp.entity';
import { SetProfileDto } from 'src/typeorm/customer.entity';

@Controller('ws/customer')
@ApiTags('ws/customer')
export class WsCustomerController {
  constructor(private service: WsCustomerService) {}

  @Post('login')
  login(@Req() req: Request, @Body() body: LoginDto, @Res() res: Response) {
    return this.service.login({ body }).then((result) => {
      return res
        .cookie('access_token', `Bearer ${result.token}`)
        .json(BaseResponse.success(`Bearer ${result.token}`))
        .status(200);
    });
  }
  @Get('profile')
  @UseGuards(LocalAuthGuard)
  profile(@Req() req: Request) {
    const by = req.user as CustomerDto;
    return this.service.getById(by.id);
  }
  @Put('profile')
  @UseGuards(LocalAuthGuard)
  setProfile(@Req() req: Request, @Body() body: SetProfileDto) {
    const by = req.user as CustomerDto;
    return this.service.setProfile({ by, body });
  }
  @Get('send_otp/:phone')
  sendOtp(@Param('phone') phone: string) {
    return this.service.sendOtp({ phone });
  }
  @Post('otp_verification')
  otpVerification(@Body() body: OtpVerificationDto, @Res() res: Response) {
    return this.service.otpVerification(body, res);
  }
}
