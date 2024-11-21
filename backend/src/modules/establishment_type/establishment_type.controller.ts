import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { ApiTags } from "@nestjs/swagger/dist/decorators/api-use-tags.decorator";
import { EstablishmentTypeService } from "./establishment_type.service";
import { Get, Post, Put } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { UseGuards } from "@nestjs/common/decorators/core/use-guards.decorator";
import { UseInterceptors } from "@nestjs/common/decorators/core/use-interceptors.decorator";
import { AuthenticatedGuard } from "../security/authenticated.guard";
import { fileInterCeptorImg, storageCustom } from "src/utils/multer.config";
import { Body, Param, UploadedFile, UploadedFiles } from "@nestjs/common/decorators/http/route-params.decorator";
import { EstablishmentTypeDto } from "src/typeorm/establishment_type";
import { UserDto } from "src/typeorm/user.entity";
import { CurrentUser } from "src/annotations/current_user";
import { FileFieldsInterceptor } from "@nestjs/platform-express/multer/interceptors/file-fields.interceptor";

@Controller("establishment_type")
@ApiTags("establishment_type")
export class EstablishmentTypeController{
    constructor(private service:EstablishmentTypeService){}
    @Get("all")
    getAll(){
return this.service.getAll()
    }
    @Post('create')
    @UseGuards(AuthenticatedGuard)
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'file', maxCount: 1 },
        { name: 'background', maxCount: 1 },
      ], {storage:storageCustom}))
    create(
      @Body() body: EstablishmentTypeDto,
      @CurrentUser() by: UserDto,
      @UploadedFiles() files: { file?: Express.Multer.File[], background?: Express.Multer.File[] }
    ) {
      const  file=  (files.file?.length>0)?files.file[0]:null;
    const  background=  (files.background?.length>0)?files.background[0]:null;
        return this.service.create({body, file, background})
    }
    @Put('update/:id')
    @UseGuards(AuthenticatedGuard)
    @UseInterceptors(FileFieldsInterceptor([
      { name: 'file', maxCount: 1 },
      { name: 'background', maxCount: 1 },
    ], {storage:storageCustom}))
    update(
      @Body() body: EstablishmentTypeDto,
      @CurrentUser() by: UserDto,
      @UploadedFiles() files: { file?: Express.Multer.File[], background?: Express.Multer.File[] },
      @Param('id') id: number,
    ) {
     
      const  file=  (files.file?.length>0)?files.file[0]:null;
      const  background=  (files.background?.length>0)?files.background[0]:null;
      return this.service.update({ file,background, body, id });
    }
}