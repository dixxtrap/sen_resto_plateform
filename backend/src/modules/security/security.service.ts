import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './security.dto';
import { JwtService } from '@nestjs/jwt';

import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { CryptoService } from 'src/utils/crypto_service';
import { UserDto } from 'src/typeorm/user.entity';
import { CustomerService } from '../partner/customer/customer.service';
import { WsCatch } from 'src/utils/catch';
import { MailerService } from '../mailer/mailer.service';

@Injectable()
export class SecurityService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private mailService: MailerService,
    private customerService: CustomerService,
  ) {}
  async login(body: LoginDto) {
    const user = await this.userService.findByEmailForLogin({
      email: body.username,
    });
    if (!user)
      throw new HttpException({ ...HttpExceptionCode.LOGIN_FAILLURE }, 401);
    // if (user.isActive == false) throw new UnauthorizedException();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordCrypt, password, ...rest } = user;
    console.log(user);
    if (user.password === CryptoService.createHash(body.password)) {
      return { ...rest };
    }

    // 💡inplement the logic
    throw new WsMessage(HttpExceptionCode.NOT_FOUND);
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
    console.log(token);
    console.log(password);
    const decode = await this.jwtService.verify(token, {
      secret: process.env.CRYPTO_KEY,
    });
    if (decode) {
      return await this.userService.definePassword({ id: decode.id, password });
    }
    throw new WsMessage(HttpExceptionCode.LOGIN_FAILLURE);
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
        { id, firstname, lastname, email },
        {
          secret: process.env.CRYPTO_KEY,
          expiresIn: 24 * 60 * 60 + 's',
        },
      );
      this.mailService.sendActivationMail({
        to: email,
        token,
      });
      return HttpExceptionCode.SUCCEEDED;
    }
    throw new NotFoundException();
  }
  userLogin({ phone, code }: { phone: string; code: string }) {
    console.log(code);
    return this.customerService
      .getByPhone({ phone })
      .then((user) => {
        console.log(user);
        if (user) {
          const { firstname, lastname, id, phone } = user;
          const token = this.jwtService.sign(
            { firstname, lastname, id, phone },
            {
              secret: process.env.CRYPTO_KEY,
            },
          );
          return { ...HttpExceptionCode.SUCCEEDED, token };
        }
        throw new WsMessage(HttpExceptionCode.NOT_FOUND);
      })
      .catch(WsCatch);
  }
}
