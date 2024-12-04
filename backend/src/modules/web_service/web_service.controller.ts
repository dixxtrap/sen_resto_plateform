import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { WsService } from "./web_service.service";
import { Get } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { ApiTags } from "@nestjs/swagger/dist/decorators/api-use-tags.decorator";
@ApiTags('ws/default')
@Controller('ws/default')
export class WsController {

    constructor(private service: WsService) {
    }
    @Get('icon/all')
    getAllIcon() {
        return this.service.getIcons()
    }

}