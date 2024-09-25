import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OtpService } from './otp.service';

@Controller('otp')
@ApiTags('otp')
export class OtpController {
  constructor(private service: OtpService) {}
  @Get()
  getAll() {
    return this.service.getAll();
  }
  
}
