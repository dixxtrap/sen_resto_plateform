import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CardService } from './card.service';
import { fileInterCeptorTmp } from 'src/utils/multer.config';
import { CardAllocationDto } from 'src/typeorm/card_allocation.entity';
import { AuthenticatedGuard } from '../security/authenticated.guard';
import { Request } from 'express';
import { CreateUserDto, UserDto } from 'src/typeorm/user.entity';

@Controller('card')
@ApiTags('card')
export class CardController {
  constructor(private service: CardService) {}
  @Get('all')
  @UseGuards(AuthenticatedGuard)
  get(@Req() req: Request) {
    return this.service.getAll({ by: req.user as CreateUserDto });
  }
  @Get('available/:quantity')
  @UseGuards(AuthenticatedGuard)
  getAvailable(@Req() req: Request, @Param('quantity') quantity: number) {
    return this.service.getAvailableCard({
      quantity,
      by: req.user as CreateUserDto,
    });
  }
  @Post('bulk')
  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(fileInterCeptorTmp)
  bulk(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CardAllocationDto,
    @Req() req: Request,
  ) {
    return this.service.createBulk({
      by: req.user as CreateUserDto,
      path: file.path,
      body,
    });
  }
}
