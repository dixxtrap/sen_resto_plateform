import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeliverService } from './deliver.service';
import { DeliverDto } from 'src/typeorm/deliver.entity';
import { AuthenticatedGuard } from 'src/modules/security/authenticated.guard';
import { CurrentUser } from 'src/annotations/current_user';
import { UserDto } from 'src/typeorm/user.entity';

@Controller('deliver')
@ApiTags('deliver')
export class DeliverController {
  constructor(private service: DeliverService) {}
  @Get('all')
  @UseGuards(AuthenticatedGuard)
  getAll(@CurrentUser() by:UserDto) {
    return this.service.getAll({by});
  }
  @Get('by_id/:id')
  @UseGuards(AuthenticatedGuard)
  getById(@CurrentUser() by:UserDto,  @Param('id') id: number) {
    return this.service.getById({id});
  }
  @Post('create')
  @UseGuards(AuthenticatedGuard)

  create(@CurrentUser() by:UserDto, @Body() body: DeliverDto, ) {
    return this.service.create({ body, by });
  }
  @Put('regenerate_code/:id')
  @UseGuards(AuthenticatedGuard)
  regenerateCode(@CurrentUser() by:UserDto, @Param('id') id: number) {
    return this.service.reGenerateCode({ id, by });
  }
  @Put('update/:id')
  @UseGuards(AuthenticatedGuard)
  update(@Body() body: DeliverDto, @Param('id') id: number) {
    return this.service.update({ id, body });
  }
}
