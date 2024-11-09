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
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ShopService } from './shop.service';
import { CompanyShopDto } from 'src/typeorm/partner/company_shop.entity'
import { fileInterCeptorImg, storageCustom } from 'src/utils/multer.config';
import { AuthenticatedGuard } from 'src/modules/security/authenticated.guard';
import { Request } from 'express';
import { UserDto } from 'src/typeorm/user.entity';
import { FileFieldsInterceptor } from '@nestjs/platform-express/multer/interceptors/file-fields.interceptor';
import { CurrentUser } from 'src/annotations/current_user';

@Controller('shop')
@ApiTags('shop')
export class ShopController {
  constructor(private service: ShopService) {}
  @Get('all')
  @UseGuards(AuthenticatedGuard)
  getAll(@Req() req: Request) {
    const by = req.user as UserDto;
    return this.service.getAll({ by });
  }
  @Get('byId/:id')
  @UseGuards(AuthenticatedGuard)
  getById(@Param('id') id: number) {
    return this.service.getById({ id });
  }
  @Post('create')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'file', maxCount: 1 },
    { name: 'background', maxCount: 1 },
  ],{storage:storageCustom}))
  @UseGuards(AuthenticatedGuard)
  create(@Body() body: CompanyShopDto, @CurrentUser() by: UserDto, @UploadedFiles() files: { file?: Express.Multer.File[], background?: Express.Multer.File[] }) {
    const  file=  (files && files.file?.length>0)?files.file[0]:null;
    const  background=  (files && files.background?.length>0)?files.background[0]:null;
   
    if (background) body.backgroundPath = background.path;
    return this.service.create({ body, by , file, background});
  }
  @Put('update/:id')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'file', maxCount: 1 },
    { name: 'background', maxCount: 1 },
  ],{storage:storageCustom}))
  @UseGuards(AuthenticatedGuard)
  update(
    @Body() body: CompanyShopDto,
    @Param('id') id: number,
    @UploadedFiles() files: { file?: Express.Multer.File[], background?: Express.Multer.File[] }
  ) {
    const  file=  (files && files.file?.length>0)?files.file[0]:null;
    const  background=  (files && files.background?.length>0)?files.background[0]:null;
  
    if (background) body.backgroundPath = background.path;
    return this.service.update({ id, body, file , background});
  }
}
