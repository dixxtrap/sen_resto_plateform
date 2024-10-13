
import { ApiTags } from '@nestjs/swagger';
import { WsCompanyService } from './company.service';
import { Controller } from '@nestjs/common/decorators/core/controller.decorator';
import { Get } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Param } from '@nestjs/common/decorators/http/route-params.decorator';

@Controller('ws/company')
@ApiTags('ws/company')
export class WsCompanyController {
  constructor(private service: WsCompanyService) {}
  @Get('all')
  getAll() {
    return this.service.getAll();
  }
  @Get('establishment_type/all')
  getByEstablishmentTypeAll() {
    return this.service.getByEstablishmentType();
  }
  @Get('establishment_type/by_id/:id')
  getByEstablishmentTypeById(@Param('id')id:number) {
    return this.service.getbyEstablishmentId({id});
  }
  @Get('details/:id')
  getById(@Param("id") id:number) {
    return this.service.getById({id});
  }
}
