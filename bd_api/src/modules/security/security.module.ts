import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { SecurityController } from './security.controller';
import { SecurityService } from './security.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.API_KEY,
      signOptions: {
        expiresIn: '2d',
      },
    }),
    UserModule,
  ],
  controllers: [SecurityController],
  providers: [SecurityService],
})
export class SecurityModule {}
