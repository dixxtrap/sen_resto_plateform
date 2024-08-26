import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductFileService } from './product_file.service';
import { ProductFileDto } from 'src/typeorm/product_file.entity';
import { fileInterCeptorImg } from 'src/utils/multer.config';
import { AuthenticatedGuard } from '../../security/authenticated.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('product_file')
@ApiTags('product_file')
export class ProductFileController {
  constructor(private service: ProductFileService) {}
  @Post('create')
  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(fileInterCeptorImg)
  create(
    @Body() body: ProductFileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) body.path = file?.path ?? null;
    return this.service.create({ body, file });
  }
  @Put('update/:id')
  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(fileInterCeptorImg)
  update(
    @Body() body: ProductFileDto,
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) body.path = file?.path ?? null;
    return this.service.update({ body, id, file });
  }
  @Delete('delete/:id')
  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(fileInterCeptorImg)
  delete(@Param('id') id: number) {
    return this.service.delete({ id });
  }
}
