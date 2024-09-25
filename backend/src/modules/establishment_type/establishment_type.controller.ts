import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { ApiTags } from "@nestjs/swagger/dist/decorators/api-use-tags.decorator";
import { EstablishmentTypeService } from "./establishment_type.service";
import { Get, Post, Put } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { UseGuards } from "@nestjs/common/decorators/core/use-guards.decorator";
import { UseInterceptors } from "@nestjs/common/decorators/core/use-interceptors.decorator";
import { AuthenticatedGuard } from "../security/authenticated.guard";
import { fileInterCeptorImg } from "src/utils/multer.config";
import { Body, Param, UploadedFile } from "@nestjs/common/decorators/http/route-params.decorator";
import { EstablishmentTypeDto } from "src/typeorm/establishment_type";
import { UserDto } from "src/typeorm/user.entity";
import { CurrentUser } from "src/annotations/current_user";

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
    @UseInterceptors(fileInterCeptorImg)
    create(
      @Body() body: EstablishmentTypeDto,
      @CurrentUser() by: UserDto,
      @UploadedFile() file: Express.Multer.File,
    ) {
        return this.service.create({body, file})
    }
    @Put('update/:id')
    @UseGuards(AuthenticatedGuard)
    @UseInterceptors(fileInterCeptorImg)
    update(
      @Body() body: EstablishmentTypeDto,
      @CurrentUser() by: UserDto,
      @UploadedFile() file: Express.Multer.File,
      @Param('id') id: number,
    ) {
     
      console.log(file);
      return this.service.update({ file, body, id });
    }
}