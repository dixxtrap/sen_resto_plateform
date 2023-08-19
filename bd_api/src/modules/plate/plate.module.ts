import { Module } from '@nestjs/common';
import { PlateController } from './plate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plate, FileDocument, PlateFile, Tag, TagPlate } from 'src/typeorm';
import { PlateService } from './plate.service';
import { MulterModule } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';

@Module({
  imports: [
    MulterModule.register({
      preservePath: false,

      dest: 'upload',
      storage: diskStorage({
        destination: 'upload', // Dossier de destination où les fichiers téléchargés seront stockés
      }),
    }),
    TypeOrmModule.forFeature([Plate, FileDocument, PlateFile, Tag, TagPlate]),
  ],
  controllers: [PlateController],
  providers: [PlateService],
})
export class PlateModule {}
