import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BannerService } from './banner.service';
import { BannerDto } from 'src/typeorm/banner.entity';
import { fileInterCeptorImg } from 'src/utils/multer.config';
import { AuthenticatedGuard } from '../security/authenticated.guard';
import { Request } from 'express';
import { UserDto } from 'src/typeorm/user.entity';
@Controller('banner')
@ApiTags('banner')
export class BannerController {
  constructor(private readonly service: BannerService) {}
  @Get('all')
  @UseGuards(AuthenticatedGuard)
  getAll(@Req() req: Request) {
    const by = req.user as UserDto;
    return this.service.getAll({ by });
  }
  @Get('by_id/:id')
  getById(@Req() req: Request, @Param('id') id: number) {
    const by = req.user as UserDto;
    return this.service.getById({ by, id });
  }
  @Put('update/:id')
  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(fileInterCeptorImg)
  update(
    @Body() body: BannerDto,
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
  ) {
    const by = req.user as UserDto;
    console.log(file);
    return this.service.update({ file, by, body, id });
  }
  @Delete('delete/:id')
  @UseGuards(AuthenticatedGuard)
  delete(@Param('id') id: number, @Req() req: Request) {
    const by = req.user as UserDto;
    return this.service.delete({ id, by });
  }
  @Post('create')
  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(fileInterCeptorImg)
  create(
    @Body() body: BannerDto,
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const by = req.user as UserDto;
    console.log(file);
    return this.service.create({ file, by, body });
  }
}
