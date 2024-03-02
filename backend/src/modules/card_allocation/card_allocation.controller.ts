import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CardAllocationService } from './card_allocation.service';

@ApiTags('card_allocation')
@Controller('card_allocation')
export class CardAllocationController {
  constructor(private service: CardAllocationService) {}
}
