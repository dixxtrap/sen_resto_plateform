import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/typeorm/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductManagementService } from './product_management.service';
import { WeekdayService } from './weekday.service';
import {
  ProductManagement,
  ProductManagementDay,
} from 'src/typeorm/product_management.entity';
import { Weekday } from 'src/typeorm';
import { ProductCategory } from 'src/typeorm/product_category.entity';
import { MulterConfig } from 'src/utils/multer.config';
import { ProductFileService } from './product_file.service';
import { ProductFileController } from './product_file.controller';
import { ProductFile } from 'src/typeorm/product_file.entity';
import { S3Module } from '../s3/s3.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductFile,
      ProductCategory,
      ProductManagement,
      ProductManagementDay,
      Weekday,
    ]),
    MulterConfig,
    S3Module,
  ],
  controllers: [ProductController, ProductFileController],
  providers: [
    ProductService,
    ProductManagementService,
    WeekdayService,
    ProductFileService,
  ],
})
export class ProductModule {}
