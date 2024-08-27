import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/typeorm/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductManagementService } from './management/product_management.service';
import { WeekdayService } from './week_day/weekday.service';
import {
  ProductManagement,
  ProductManagementDay,
} from 'src/typeorm/product_management.entity';
import { Weekday } from 'src/typeorm';
import { ProductCategory } from 'src/typeorm/product_category.entity';
import { MulterConfig } from 'src/utils/multer.config';
import { ProductFileService } from './file/product_file.service';
import { ProductFileController } from './file/product_file.controller';
import { ProductFile } from 'src/typeorm/product_file.entity';
import { S3Module } from '../s3/s3.module';
import { ProductHistory } from 'src/typeorm/product_history.entity';
import { ProductHistoryService } from './history/product_history.service';
import { ProductHistoryController } from './history/product_history.controller';

@Module({
  imports: [
  
    MulterConfig,
    S3Module,
  ],
  controllers: [
    ProductController,
    ProductFileController,
    ProductHistoryController,
  ],
  providers: [
    ProductService,
    ProductManagementService,
    WeekdayService,
    ProductFileService,
    ProductHistoryService,
  ],
  exports: [ProductHistoryService],
})
export class ProductModule {}
