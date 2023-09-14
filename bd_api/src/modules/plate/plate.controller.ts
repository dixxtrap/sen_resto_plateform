import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PlateService } from './plate.service';
import { GetPalteDto, PlateDto } from 'src/dto/plate.dto';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { LocalAuthGuard } from 'src/middleware/local_auth.guard';
import { Request } from 'express';
@ApiTags('plate')
@Controller('plate')
export class PlateController {
  constructor(private service: PlateService) {}
  @Get()
  @ApiResponse({ type: [GetPalteDto], status: 200 })
  getS() {
    return this.service.getS();
  }
  @Get('/:id')
  get(@Param('id') id: number) {
    return this.service.get(id);
  }
  @Get('restaurant/:id')
  getByRestaurant(@Param('id') id: number) {
    return this.service.getByRestaurant(id);
  }
  @Post()
  @UseGuards(LocalAuthGuard)
  @ApiBearerAuth()
  create(@Body() item: PlateDto, @Req() req: Request) {
    return this.service.create(item, req['user']);
  }
  @Put('/:id')
  update(@Param('id') id: number, @Body() item: PlateDto) {
    item.id = id;
    console.log(item);
    return this.service.update(item);
  }
  @Post('/:id/photo')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: './upload',
      storage: diskStorage({
        destination: './upload', // Dossier de destination où les fichiers téléchargés seront stockés
        filename: (req, file, callback) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');

          return callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  addPhoto(
    @UploadedFile()
    file: Express.Multer.File,
    @Param('id') id: number,
  ) {
    console.log(file);
    return this.service.addPhoto(id, file);
  }
}
