

import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { databaseProviders } from './database.providers';
import { ConfigModule } from '@nestjs/config';
import { Global } from '@nestjs/common/decorators/modules/global.decorator';
import { entityProviders } from 'src/typeorm';
@Global()
@Module({
    imports:[ConfigModule],
  providers: [...databaseProviders, ...entityProviders],
  exports: [...databaseProviders,...entityProviders],
})
export class DatabaseModule {}
