import { Module } from '@nestjs/common/';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CompanyUser, RestaurantUser, User } from 'src/typeorm';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.API_KEY,
      signOptions: {
        expiresIn: '2d',
      },
    }),
    TypeOrmModule.forFeature([User, CompanyUser, RestaurantUser]),
  ],
  controllers: [UserController],

  providers: [JwtStrategy, UserService],
  exports: [PassportModule, JwtModule],
})
export class UserModule {}
