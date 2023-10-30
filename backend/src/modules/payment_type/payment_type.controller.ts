import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PaymentTypeService } from './payment_type.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaymentTypeDto } from 'src/dto/payment_type.dto';
import { LocalAuthGuard } from 'src/middleware/local_auth.guard';
import { Request } from 'express';

@ApiTags('payment_type')
@ApiBearerAuth()
@Controller('payment_type')
@UseGuards(LocalAuthGuard)
export class PaymentTypeController {
  constructor(private service: PaymentTypeService) {}
  @Get()
  getS() {
    return this.service.getS();
  }
  @Get('/:id')
  get(@Param('id') id: number) {
    return this.service.get(id);
  }
  @Post()
  post(@Body() body: PaymentTypeDto, @Req() req: Request) {
    return this.service.post(body, req['user']);
  }
  @Put('/:id')
  update(
    @Body() body: PaymentTypeDto,
    @Param('id') id: number,
    @Req() req: Request,
  ) {
    return this.service.update(id, { ...body, createById: req['user'].id });
  }
}
