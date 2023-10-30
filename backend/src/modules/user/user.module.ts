import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { User } from 'src/typeorm';
import { JWT } from 'src/jtw';
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JWT,
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],

  providers: [JwtStrategy, UserService],
  exports: [PassportModule, JwtModule, UserService],
})
export class UserModule {}
