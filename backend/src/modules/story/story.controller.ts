import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { StoryService } from './story.service';
import { Controller } from '@nestjs/common/decorators/core/controller.decorator';
import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator';
import { filesInterCeptorImg } from 'src/utils/multer.config';
import { Body, Param, Req, UploadedFiles } from '@nestjs/common/decorators/http/route-params.decorator';

import { UserDto } from 'src/typeorm/user.entity';
import { AuthenticatedGuard } from '../security/authenticated.guard';
import { Delete, Get, Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
@Controller('story')
@ApiTags('story')
export class StoryController {
  constructor(private service: StoryService) {}
@Get('all')
@UseGuards(AuthenticatedGuard)
getAll(@Req() req:Express.Request){
 
return this.service.getAll({by:req.user as UserDto})
}
@Delete("delete/:id")
delete(@Req() req:Express.Request,@Param('id')id:number){
  return this.service.delete({id, by:req.user as UserDto})
}
@Post('create')

  @UseInterceptors(filesInterCeptorImg)
  @UseGuards(AuthenticatedGuard)
  create(@Req() by:Express.Request,@UploadedFiles() file: Array<Express.Multer.File>){
    console.log(file)
    console.log(by)
return this.service.create({by:by.user as UserDto, files:file})
  }
}
