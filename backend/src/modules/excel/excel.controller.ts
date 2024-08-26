import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ExcelService } from './excel.service';
import { fileInterCeptorTmp } from 'src/utils/multer.config';
import { ApiTags } from '@nestjs/swagger';

@Controller('excel')
@ApiTags('excel')
export class ExcelController {
  constructor(private service: ExcelService) {}
  @Post('card')
  @UseInterceptors(fileInterCeptorTmp)
  getCardList(@UploadedFile() file: Express.Multer.File, @Body() body) {
    console.log(
      '-------------------------get card file info------------------------',
    );
    return this.service.transformFile({ body, path: file.path });
  }
}
