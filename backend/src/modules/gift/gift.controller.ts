import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { ApiTags } from "@nestjs/swagger/dist/decorators/api-use-tags.decorator";
import { GiftService } from "./gift.service";

@Controller('gift')
@ApiTags('gift')
export class GiftController{
    constructor(private service:GiftService){}
    
}
