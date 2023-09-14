import {
  Controller,
  Get,
  Param,
  Put,
  Query,
  Req,
  Res,
  Request,
  Response,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectRepository } from '@nestjs/typeorm';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { FileDocument } from 'src/typeorm';
import { Repository } from 'typeorm';
import { DocumentService } from './document_file.service';
import * as fs from 'fs';
import { ApiTags } from '@nestjs/swagger';
@Controller('document')
@ApiTags('document_file')
export class DocumentController {
  constructor(
    @InjectRepository(FileDocument)
    private doc: Repository<FileDocument>,
    private docService: DocumentService,
  ) {}
  @Get('file/:id')
  async getFile(@Res() res, @Param('id') id: number) {
    const file = await this.doc.findOneBy({
      id: id,
    });
    console.log('path:=================', file);
    const filePath = join(__dirname, '..', '..', '..', file.path); // Path to the specific file
    return res.sendFile(filePath);
  }
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: './upload',
      storage: diskStorage({
        destination: (req, file, cb) => {
          console.log('------------------destination file-------------------');
          console.log(file);
          console.log(file);
          cb(null, './upload/');
        }, // Dossier de destination où les fichiers téléchargés seront stockés
        filename: (req, file, callback) => {
          console.log(
            '------------------destination file name-------------------',
          );
          console.log(req.body);
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');

          return callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async updateFile(
    @UploadedFile()
    file: Express.Multer.File,
    @Param('id') id: number,
    @Req() _req: unknown,
  ) {
    const resp = await this.docService.update({ ...file, id: id });
    const filePath = join(__dirname, '..', '..', '..', resp.path);

    if (file.path && filePath)
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
        } else {
          console.log('File deleted successfully.');
        }
      });
    return resp;
  }
}
