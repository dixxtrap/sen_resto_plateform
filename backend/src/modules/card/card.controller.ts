import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CardService } from './card.service';

@Controller('card')
@ApiTags('card')
export class CardController {
  constructor(private service: CardService) {}
}
