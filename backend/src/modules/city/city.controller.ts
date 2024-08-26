import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { ApiTags } from "@nestjs/swagger/dist/decorators/api-use-tags.decorator";
import { CityService } from "./city.service";
import { ExcelService } from '../excel/excel.service';
import { Get, Post } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { UseInterceptors } from "@nestjs/common/decorators/core/use-interceptors.decorator";
import { fileInterCeptorImg } from "src/utils/multer.config";
import { Param, Query, UploadedFile } from "@nestjs/common/decorators/http/route-params.decorator";
import { PaginationDto } from "src/utils/pagination";

@Controller('city')
@ApiTags('city')
export class CityController{
    constructor(private service:CityService ){}

@Get('all')
find(@Query('') pagination:PaginationDto){
return this.service.findAll({pagination});
}
@Get('region')
findRegion(){
return this.service.findRegion();
}
@Get('children/:id')
findChildren(@Param('id')id:number){
return this.service.findChildren({id});
}
}