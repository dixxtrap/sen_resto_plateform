import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecurityController } from './security.controller';
import { SecurityService } from './security.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { EmailService } from 'src/utils/mail.service';
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.CRYPTO_KEY,
      signOptions: { expiresIn: '60s' },
    }),
    UserModule,
    PassportModule.register({ session: true, defaultStrategy: 'local' }),
    // TypeOrmModule.forFeature([]),x
  ],
  controllers: [SecurityController],
  providers: [SessionSerializer, LocalStrategy, SecurityService, EmailService],
  exports: [SecurityService],
})
export class SecurityModule {}
