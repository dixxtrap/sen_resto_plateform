import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { SecurityService } from './security.service';
import { DefinePasswordDto, LoginDto } from './security.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthenticatedGuard } from './authenticated.guard';
import { LocalAuthGuard } from './local_auth.guard';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { Request, Response } from 'express';
import { UserDto } from 'src/typeorm/user.entity';
import { JwtAuthGuard } from './jwt_auth.guard';

@Controller('security')
@ApiTags('security')
export class SecurityController {
  constructor(private service: SecurityService) {}
  
  @Get('user/profile')
  @UseGuards(JwtAuthGuard)
  userProfile(@Body() body: LoginDto, @Req() req: Request) {
    return req.user;
  }
  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Body() body: LoginDto) {
    console.log(body);
    return HttpExceptionCode.LOGIN_SUCCESS;
  }

  @ApiBearerAuth()
  @UseGuards(AuthenticatedGuard)
  @Get('profile')
  profile(@Req() req: Request) {
    const by = req['user'] as UserDto;
    return this.service.getProfile(by);
  }
  @ApiBearerAuth()
  @UseGuards(AuthenticatedGuard)
  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.logOut({}, (err) => err);
    res.redirect(`${process.env.CLIENT_HOSTNAME}/login`);
  }

  @Get('activation')
  verifierOtp(@Query('token') token: string, @Res() res: Response) {
    console.log(token);
    return res.redirect(
      `${process.env.CLIENT_HOSTNAME}/define-password?token=${token}`,
    );
  }

  @Get('forgot_password')
  forgotPaswordVerification(
    @Query('token') token: string,
    @Res() res: Response,
  ) {
    console.log(token);
    return res.redirect(
      `${process.env.CLIENT_HOSTNAME}/define-password?token=${token}`,
    );
  }
  @Post('definePassword')
  definePassword(
    @Query('token') token: string,
    @Body() body: DefinePasswordDto,
  ) {
    body.token = token;
    return this.service.definePassword(body);
  }
  @Post('forgot_password')
  forgotPassword(@Body('email') body: string) {
    return this.service.forgotPassword(body);
  }
}
