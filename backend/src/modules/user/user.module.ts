import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { UserService } from './user.service';
import { MailerModule } from '../mailer/mailer.module';

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User]), MailerModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
