import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import {
  Company,
  CompanyContact,
  Restaurant,
  RestaurantContact,
  User,
} from 'src/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantController } from './restaurant.controller';
import { PermissionModule } from '../permission/permission.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { DocumentModule } from '../document_file/document_file.module';

@Module({
  imports: [
    MulterModule.register({
      preservePath: false,

      dest: 'upload',
      storage: diskStorage({
        destination: 'upload', // Dossier de destination où les fichiers téléchargés seront stockés
      }),
    }),
    TypeOrmModule.forFeature([
      Company,
      Restaurant,
      CompanyContact,
      RestaurantContact,
      User,
    ]),
    PermissionModule,
    DocumentModule,
  ],
  controllers: [CompanyController, RestaurantController],
  providers: [CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}
