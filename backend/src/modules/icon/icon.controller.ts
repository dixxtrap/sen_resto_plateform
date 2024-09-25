import { Get, Post, Put } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { IconService } from "./icon.service";
import { UseGuards } from "@nestjs/common/decorators/core/use-guards.decorator";
import { AuthenticatedGuard } from "../security/authenticated.guard";
import { UseInterceptors } from "@nestjs/common/decorators/core/use-interceptors.decorator";
import { fileInterCeptorImg } from "src/utils/multer.config";
import { Body, Param, UploadedFile } from "@nestjs/common/decorators/http/route-params.decorator";
import { IconDto } from "src/typeorm/icon.entity";
import { CurrentUser } from "src/annotations/current_user";
import { UserDto } from "src/typeorm/user.entity";
import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { ApiTags } from "@nestjs/swagger/dist/decorators/api-use-tags.decorator";
@Controller("icon")
@ApiTags("icon")
export class IconController{
    constructor(private service:IconService){}
    @Get("all")
    getAll(){
return this.service.getAll()
    }
    @Post('create')
    @UseGuards(AuthenticatedGuard)
    @UseInterceptors(fileInterCeptorImg)
    create(
      @Body() body: IconDto,
      @CurrentUser() by: UserDto,
      @UploadedFile() file: Express.Multer.File,
    ) {
        return this.service.create({body, file})
    }
    @Put('update/:id')
    @UseGuards(AuthenticatedGuard)
    @UseInterceptors(fileInterCeptorImg)
    update(
      @Body() body: IconDto,
      @CurrentUser() by: UserDto,
      @UploadedFile() file: Express.Multer.File,
      @Param('id') id: number,
    ) {
     
      console.log(file);
      return this.service.update({ file, body, id });
    }
}