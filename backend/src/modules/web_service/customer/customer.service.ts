import { Injectable } from '@nestjs/common';
import { LoginDto } from 'src/modules/security/security.dto';
import { SecurityService } from 'src/modules/security/security.service';

@Injectable()
export class WsCustomerService {
  constructor(private securityService: SecurityService) {}
  login({ body }: { body: LoginDto }) {
    return this.securityService.userLogin({
      phone: body.username,
      code: body.password,
    });
  }
}
