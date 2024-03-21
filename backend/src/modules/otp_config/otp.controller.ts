import { Controller } from '@nestjs/common';
import { OtpConfigService } from './otp.service';

@Controller('otp_config')
export class OtpConfigController {
  constructor(private service: OtpConfigService) {}
}
