import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    console.log('------------------jwt -strategy-constructor------------------');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.CRYPTO_KEY,
    });
  }

  async validate(payload: any) {
    console.log('------------------jwt -strategy-vamidator------------------');
    return {...payload };
  }
}
