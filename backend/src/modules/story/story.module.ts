import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { MulterConfig } from 'src/utils/multer.config';
import { S3Module } from '../s3/s3.module';
import { StoryController } from './story.controller';
import { StoryService } from './story.service';

@Module({
  imports: [MulterConfig, S3Module],
  controllers: [StoryController],
  providers: [StoryService],
  exports: [],
})
export class StoryModule {}
