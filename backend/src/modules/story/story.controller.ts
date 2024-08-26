import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { StoryService } from './story.service';
import { Controller } from '@nestjs/common/decorators/core/controller.decorator';
@Controller('story')
@ApiTags('story')
export class StoryController {
  constructor(private service: StoryService) {}
}
