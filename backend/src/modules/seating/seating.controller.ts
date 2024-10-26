import { Controller } from '@nestjs/common/decorators/core/controller.decorator';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { SeatingService } from './seating.service';
import {
  Get,
  Post,
  Put,
} from '@nestjs/common/decorators/http/request-mapping.decorator';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { AuthenticatedGuard } from '../security/authenticated.guard';
import { CurrentUser } from 'src/annotations/current_user';
import { UserDto } from 'src/typeorm/user.entity';
import {
  Body,
  Param,
} from '@nestjs/common/decorators/http/route-params.decorator';
import { SeatingDto } from 'src/typeorm/seating.entity';

@Controller('seating')
@ApiTags('seating')
export class SeatingController {
  constructor(private service: SeatingService) {}
  @Get('all')
  @UseGuards(AuthenticatedGuard)
  getAll(@CurrentUser() by: UserDto) {
    return this.service.getAll({ by });
  }
  @Post('create')
  @UseGuards(AuthenticatedGuard)
  create(@CurrentUser() by: UserDto, @Body() body: SeatingDto) {
    return this.service.create({ by, body });
  }
  @Put('update/:id')
  @UseGuards(AuthenticatedGuard)
  update(
    @CurrentUser() by: UserDto,
    @Param('id') id: number,
    @Body() body: SeatingDto,
  ) {
    return this.service.update({ by, id, body });
  }
}
