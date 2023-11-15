import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SecurityService } from './security.service';
import { LoginDto } from './dto/loginDto';
import { Request, Response } from 'express';
import { exceptionCode } from 'src/data/exception_code';
import { LocalAuthGuard } from 'src/middleware/local_auth.guard';
@Controller('security')
@ApiTags('Security')
export class SecurityController {
  constructor(private service: SecurityService) {}
  @Post('/login')
  async login(@Body() body: LoginDto, @Res() res: Response) {
    const token = await this.service.login(body);
    console.log(token);
    res.cookie('access_token', 'Bearer ' + token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      sameSite: 'none',
    });
    return res
      .status(200)
      .json({ ...exceptionCode.LOGIN_SUCCESS, token: token });
  }
  @Get('/profile')
  @ApiBearerAuth()
  @UseGuards(LocalAuthGuard)
  async profile(@Req() req: Request, @Res() res: Response) {
    console.log(
      '------------------------get profile--------------------------',
    );
    console.log(req['user']);
    const user = await this.service.profile(req);
    if (!user) {
      res.clearCookie('access_token');
      res.redirect('localhost:3000/');
    }
    return res.json(user);
  }
  @Get('/signout')
  async signout(@Res() res: Response) {
    console.log(
      `------------------deconnexion--------------- redirect to ${process.env.BAC_OFFICE_URL}`,
    );
    res.clearCookie('access_token', { sameSite: 'none' });
    return res.status(200).json(exceptionCode.LOGOUT_SUCCESS);
  }
}
