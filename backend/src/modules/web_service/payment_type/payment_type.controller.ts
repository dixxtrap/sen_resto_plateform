import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { ApiTags } from "@nestjs/swagger/dist/decorators/api-use-tags.decorator";
import { Get } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { Param } from "@nestjs/common/decorators/http/route-params.decorator";
import { WsPaymentTypeService } from "./payment_type.service";

@Controller('ws/payment_type')
@ApiTags('ws/payment_type')
export class WsPaymentTypeController{
    constructor(private service:WsPaymentTypeService){}
    @Get('all')
    getAll(){
        return this.service.getAll()
    }
    @Get('by_id/:id')
    getById(@Param('id')id :number){
        return this.service.getById({id})
    }
    
}