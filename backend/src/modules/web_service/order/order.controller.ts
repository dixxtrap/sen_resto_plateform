import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WsOrderService } from './order.service';

@Controller('ws/order')
@ApiTags('ws/order')
export class WsOrderController {
  constructor(private service: WsOrderService) {}
}
