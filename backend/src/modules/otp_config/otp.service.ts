import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OtpConfig } from 'src/typeorm/otp_config';
import { Repository } from 'typeorm';
@Injectable()
export class OtpConfigService {
  constructor(
    @InjectRepository(OtpConfig) private repos: Repository<OtpConfig>,
  ) {}
}
