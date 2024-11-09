import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/typeorm/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductManagementService } from './management/product_management.service';

import { MulterConfig } from 'src/utils/multer.config';
import { ProductFileService } from './file/product_file.service';
import { ProductFileController } from './file/product_file.controller';
import { S3Module } from '../s3/s3.module';
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
    
    ProductFileService,
    ProductHistoryService,
  ],
  exports: [ProductHistoryService],
})
export class ProductModule {}
