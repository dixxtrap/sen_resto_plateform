import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CompanyRestaurantService } from '../company_restaurant/company.service';
import { CompanyRestaurantBaseDto } from 'src/typeorm/company_restaurant.entity';
import { fileInterCeptorImg, storageCustom } from 'src/utils/multer.config';
import { AuthenticatedGuard } from 'src/modules/security/authenticated.guard';
import { Request } from 'express';
import { UserDto } from 'src/typeorm/user.entity';
import { FileFieldsInterceptor } from '@nestjs/platform-express/multer/interceptors/file-fields.interceptor';
import { CurrentUser } from 'src/annotations/current_user';

@Controller('company_restaurant')
@ApiTags('company_restaurant')
export class CompanyRestaurantController {
  constructor(private service: CompanyRestaurantService) {}
  @Get('all')
  getAll() {
    return this.service.getAll();
  }
  @Get('byId/:id')
  getById(@Param('id') id: number) {
    return this.service.getById({ id });
  }
  @Post('create')
  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'file', maxCount: 1 },
    { name: 'background', maxCount: 1 },
  ],{storage:storageCustom}))
  @UsePipes(new ValidationPipe({ transform: true }))
  create(
    @Body() body: CompanyRestaurantBaseDto,
    @CurrentUser() by: UserDto,
    @UploadedFiles() files: { file?: Express.Multer.File[], background?: Express.Multer.File []}
  ) {
    console.log(files);
    const  file=  (files.file?.length>0)?files.file[0]:null;
    const  background=  (files.background?.length>0)?files.background[0]:null;
    if (file){ body.imagePath = file.path };
    if (background) body.backgroundPath = background.path;
    // const by = req.user as UserDto;
    return this.service.create({ body, by , file:file, background:background});
  }
  @Put('update/:id')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'file', maxCount: 1 },
    { name: 'background', maxCount: 1 },
  ], {storage:storageCustom}))
  update(
    @Body() body: CompanyRestaurantBaseDto,
    @Param('id') id: number,
    @UploadedFiles() files: { file?: Express.Multer.File[], background?: Express.Multer.File[] }
  ) {
    console.log(files);
    const  file=  (files.file?.length>0)?files.file[0]:null;
    const  background=  (files.background?.length>0)?files.background[0]:null;
    if (file){ body.imagePath = file.path };
    if (background) body.backgroundPath = background.path;
    return this.service.update({ id, body, file:file, background:background });
  } 
}
