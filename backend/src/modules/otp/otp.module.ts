import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otp } from 'src/typeorm/otp.entity';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';

@Module({
  imports: [],
  providers: [OtpService],
  controllers: [OtpController],
  exports: [OtpService],
})
export class OtpModule {}
