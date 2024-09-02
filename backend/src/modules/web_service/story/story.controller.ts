import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { ApiTags } from "@nestjs/swagger/dist/decorators/api-use-tags.decorator";
import { WsStoryService } from "./story.service";
import { Get } from "@nestjs/common/decorators/http/request-mapping.decorator";

@Controller('ws/story')
@ApiTags('ws/story')
export class WsStoryController{
    constructor(private service:WsStoryService){}
    @Get("all")
    getAll(){
        return this.service.getAll()
    }
}