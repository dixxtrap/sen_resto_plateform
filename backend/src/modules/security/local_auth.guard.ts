import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SecurityService } from './security.service';
import { Request } from 'express';
import { LoginDto } from './security.dto';
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor(private service: SecurityService) {
    super();
  }
  async canActivate(context: ExecutionContext) {
    const result = (await super.canActivate(context)) as boolean;
    const request: Request = context.switchToHttp().getRequest();
    await super.logIn(request);
    return result;
  }
}
