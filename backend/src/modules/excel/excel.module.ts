import { Module } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { MulterConfig } from 'src/utils/multer.config';
import { ExcelController } from './excel.controller';

@Module({
  imports: [MulterConfig],
  providers: [ExcelService],
  controllers: [ExcelController],
})
export class ExcelModule {}
