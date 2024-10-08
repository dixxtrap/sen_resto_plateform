import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otp } from 'src/typeorm/otp.entity';
import { OtpConfig } from 'src/typeorm/otp_config';
import { OtpConfigService } from './otp.service';
import { OtpConfigController } from './otp.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Otp, OtpConfig])],
  controllers: [OtpConfigController],
  providers: [OtpConfigService],
  exports: [OtpConfigService],
})
export class OtpConfigModule {}
