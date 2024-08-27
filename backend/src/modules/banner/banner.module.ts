import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banner } from 'src/typeorm/banner.entity';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { MulterConfig } from 'src/utils/multer.config';
import { S3Module } from '../s3/s3.module';

@Module({
  imports: [MulterConfig, S3Module],
  providers: [BannerService],
  controllers: [BannerController],
})
export class BannerModule {}
