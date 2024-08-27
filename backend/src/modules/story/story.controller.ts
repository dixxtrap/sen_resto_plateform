import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { StoryService } from './story.service';
import { Controller } from '@nestjs/common/decorators/core/controller.decorator';
import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator';
import { filesInterCeptorImg } from 'src/utils/multer.config';
import { Body, UploadedFiles } from '@nestjs/common/decorators/http/route-params.decorator';
import { Post } from '@nestjs/common';
import { UserDto } from 'src/typeorm/user.entity';
@Controller('story')
@ApiTags('story')
export class StoryController {
  constructor(private service: StoryService) {}

@Post('create')
  @UseInterceptors(filesInterCeptorImg)
  create(@Body('by') by:UserDto,@UploadedFiles() files: Array<Express.Multer.File>){
return this.service.create({by, files})
  }
}
