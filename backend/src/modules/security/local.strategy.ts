import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SecurityService } from './security.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: SecurityService) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.login({
      username: username,
      password: password,
    });

    if (!user) {
      throw new UnauthorizedException();
    }
   
    return user;
  }
}
