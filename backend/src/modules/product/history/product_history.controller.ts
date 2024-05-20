import { ProductHistoryService } from './product_history.service';
import { AuthenticatedGuard } from 'src/modules/security/authenticated.guard';
import { Request } from 'express';
import { UserDto } from 'src/typeorm/user.entity';
import {
  ParseIntPipe,
  Get,
  Param,
  Req,
  UseGuards,
  Controller,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
@Controller('product_history')
@ApiTags('product_history')
export class ProductHistoryController {
  constructor(private service: ProductHistoryService) {}

  @Get('all/:id')
  @UseGuards(AuthenticatedGuard)
  getAllById(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    const by = req.user as UserDto;
    return this.service.all({ by, id });
  }
}
