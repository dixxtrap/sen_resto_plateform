
import { Request, Response } from 'express';
import { WsCustomerService } from './customer.service';
import { LoginDto } from 'src/modules/security/security.dto';
import { LocalAuthGuardCustomer } from 'src/middleware/local_auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { BaseResponse } from 'src/typeorm/response_base';
import { CustomerDto } from 'src/typeorm/customer.entity';
import { OtpChannel, OtpVerificationDto } from 'src/typeorm/otp.entity';
import { SetProfileDto } from 'src/typeorm/customer.entity';
import { Controller } from '@nestjs/common/decorators/core/controller.decorator';
import { Get, Post, Put } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Body, Param, Query, Req, Res } from '@nestjs/common/decorators/http/route-params.decorator';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';

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
  @UseGuards(LocalAuthGuardCustomer)
  profile(@Req() req: Request) {
    const by = req.user as CustomerDto;
    return this.service.getById(by.id);
  }
  @Put('profile')
  @UseGuards(LocalAuthGuardCustomer)
  setProfile(@Req() req: Request, @Body() body: SetProfileDto) {
    const by = req.user as CustomerDto;
    return this.service.setProfile({ by, body });
  }
  @Get('send_otp/:phone')
  sendOtp(@Param('phone') phone: string, @Query("channel") channel:OtpChannel) {
    return this.service.sendOtp({ phone ,channel});
  }
  @Post('otp_verification')
  otpVerification(@Body() body: OtpVerificationDto, @Res() res: Response) {
    console.log(`============body=============\n ${body}`)
    return this.service.otpVerification(body, res);
  }
  @Get('logout')
  logout(@Req() req:Request, @Res() res: Response) {
    req.logout({keepSessionInfo:true},()=>{});

    console.log(`============body=============\n ${req.isAuthenticated()}`)
   return res.cookie('access_token',null).json(HttpExceptionCode.SUCCEEDED).status(200)
   
  }
}
