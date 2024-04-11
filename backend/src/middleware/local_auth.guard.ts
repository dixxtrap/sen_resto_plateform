import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';

@Injectable()
export class LocalAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      return false;
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.CRYPTO_KEY,
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
    } catch (err) {
      // console.log(err);
      return false;
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | null {
    const [type, token] = request.headers.authorization?.split(' ') ??
      request.cookies['access_token']?.split(' ') ?? [null, null];
    if (!type || !token) return null;
    console.log(request.headers.authorization);
    return type === 'Bearer' ? token : null;
  }
}
