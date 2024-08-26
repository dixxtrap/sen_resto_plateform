import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CardAllocationService } from './card_allocation.service';
import { AuthenticatedGuard } from '../security/authenticated.guard';
import { Request } from 'express';
import { CardAllocationDto } from 'src/typeorm/card_allocation.entity';
import { UserDto } from 'src/typeorm/user.entity';
@ApiTags('card_allocation')
@Controller('card_allocation')
export class CardAllocationController {
  constructor(private service: CardAllocationService) {}
  @Get('all')
  @UseGuards(AuthenticatedGuard)
  getAll(@Req() req: Request) {
    const by = req.user as UserDto;
    console.log(by);
    return this.service.getAll({ by });
  }
  @Get('details/:id')
  @UseGuards(AuthenticatedGuard)
  details(@Req() req: Request, @Param('id') id: number) {
    const by = req.user as UserDto;
    console.log(by);
    return this.service.getCardAllocationDetails({ by , id});
  }
  @Post('create')
  @UseGuards(AuthenticatedGuard)
  create(@Req() req: Request, @Body() body: CardAllocationDto) {
    const by = req.user as UserDto;
    return this.service.create({ by, body });
  }
  @Post('accept')
  @UseGuards(AuthenticatedGuard)
  validation(@Req() req: Request, @Body() body: CardAllocationDto) {
    const by = req.user as UserDto;
    return this.service.validate({ by, body });
  }
  @Post('reject')
  @UseGuards(AuthenticatedGuard)
  rejection(@Req() req: Request, @Body() body: CardAllocationDto) {
    const by = req.user as UserDto;
    return this.service.rejection({ by, body });
  }
}
