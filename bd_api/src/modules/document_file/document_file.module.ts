import { Module } from '@nestjs/common';
import { DocumentController } from './document_file.controller';
import { DocumentService } from './document_file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileDocument } from 'src/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    TypeOrmModule.forFeature([FileDocument]),
    MulterModule.register({
      preservePath: false,

      dest: 'upload',
      storage: diskStorage({
        destination: 'upload', // Dossier de destination où les fichiers téléchargés seront stockés
      }),
    }),
  ],
  controllers: [DocumentController],
  providers: [DocumentService],
  exports: [DocumentService],
})
export class DocumentModule {}
