import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './security.dto';
import { JwtService } from '@nestjs/jwt';

import { HttpExceptionCode } from 'src/utils/http_exception_code';
import { EmailService } from 'src/utils/mail.service';
import { CryptoService } from 'src/utils/crypto_service';
import { UserDto } from 'src/typeorm/user.entity';

@Injectable()
export class SecurityService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private mailService: EmailService,
  ) {}
  async login(body: LoginDto) {
    const user = await this.userService.findByEmailForLogin({
      email: body.username,
    });
    if (!user)
      throw new HttpException({ ...HttpExceptionCode.LOGIN_FAILLURE }, 401);
    // if (user.isActive == false) throw new UnauthorizedException();
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      passwordCrypt,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      password,
      ...rest
    } = user;
console.log(user);
    if (user.password === CryptoService.createHash(body.password)) {
      return { ...rest };
    }

    // 💡inplement the logic
    throw new UnauthorizedException();
  }
  async loginWithOtp(body: LoginDto) {
    const user = await this.userService.findByEmail({ email: body.username });
    if (!user)
      throw new HttpException({ ...HttpExceptionCode.LOGIN_FAILLURE }, 401);
    // if (user.isActive == false) throw new UnauthorizedException();
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      passwordCrypt,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      password,
      ...rest
    } = user;

    if (user.password === CryptoService.createHash(body.password)) {
      return { ...rest };
    }

    // 💡inplement the logic
    throw new UnauthorizedException();
  }
  getProfile(by: UserDto) {
    return this.userService.getProfile(by);
  }
  async definePassword({
    token,
    password,
  }: {
    token: string;
    password: string;
  }) {
    const decode = await this.jwtService.verify(token, {
      secret: process.env.CRYPTO_KEY,
    });

    if (decode) {
      return await this.userService.definePassword({ id: decode.id, password });
    }
    throw new InternalServerErrorException();
  }
  async sendMailForACtivation(item: string) {
    const user = await this.userService.findByEmail({ email: item });
    if (user) {
      const { passwordCrypt, password, ...rest } = user;
      console.log(`${passwordCrypt}, ${password} `);
      if (user) return this.jwtService.sign(rest);
    }
  }
  async forgotPassword(body: string) {
    const user = await this.userService.findByEmail({ email: body });
    if (!user) throw new NotFoundException();
    const { id, firstname, lastname, email } = user;
    if (id) {
      const token = await this.jwtService.sign(
        { id, firstname, lastname },
        {
          secret: process.env.CRYPTO_KEY,
          expiresIn: 60 * 15 + 's',
        },
      );
      EmailService.sendForgotPasswordMail({
        to: email,
        entityName: 'orgisation',
        token,
      });
      return HttpExceptionCode.SUCCEEDED;
    }
    throw new NotFoundException();
  }
}
