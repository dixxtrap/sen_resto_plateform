import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyUser } from 'src/typeorm';
import { CompanyUserController } from './company_user.controller';
import { CompanyUserService } from './company_user.service';
@Module({
  imports: [TypeOrmModule.forFeature([CompanyUser])],
  controllers: [CompanyUserController],
  providers: [CompanyUserService],
})
export class CompanyUserModule {}
