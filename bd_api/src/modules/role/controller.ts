import { Body, Controller, Get, Post } from '@nestjs/common';
import { RoleService } from './service';
import { RoleDto } from 'src/dto/role.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Role')
@Controller('Role')
export class RoleController {
  constructor(private service: RoleService) {}
  @Get()
  gets() {
    return this.service.getS();
  }
  @Post()
  post(@Body() body: RoleDto) {
    return this.service.post(body);
  }
}
