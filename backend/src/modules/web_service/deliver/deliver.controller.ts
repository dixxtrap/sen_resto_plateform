import { Controller } from '@nestjs/common/decorators/core/controller.decorator';
import { WsDeliverService } from './deliver.service';
import { Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { LoginDto } from 'src/modules/security/security.dto';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';


@Controller('ws/deliver')
@ApiTags('ws/deliver')
export class WsDeliverController {
  constructor(private service: WsDeliverService) {}

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.service.login({ body });
  }
}
