import { Module } from '@nestjs/common';
import { SecurityController } from './security.controller';
import { SecurityService } from './security.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { EmailService } from 'src/utils/mail.service';
import { JwtStrategy } from './jwt.strategy';
import { PartnerModule } from '../partner/partner.module';
import { EmailerModule } from '../mailer/mailer.module';
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.CRYPTO_KEY,
      signOptions: { expiresIn: '60d' },
    }),
    UserModule,
    PartnerModule,
    EmailerModule,
    PassportModule.register({ session: true, defaultStrategy: 'local' }),
    // TypeOrmModule.forFeature([]),x
  ],
  controllers: [SecurityController],
  providers: [
    SessionSerializer,
    LocalStrategy,
    JwtStrategy,
    SecurityService,
  ],
  exports: [SecurityService],
})
export class SecurityModule {}
