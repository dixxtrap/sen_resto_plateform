import {
  Body,
  Controller,
  Get,
  OnModuleInit,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LocalAuthGuard } from 'src/middleware/local_auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/dto/user.dto';

@ApiTags('user')
@Controller('user')
export class UserController implements OnModuleInit {
  constructor(private readonly userService: UserService) {}
  onModuleInit() {
    this.createAdmin();
  }
  async createAdmin() {
    const {
      SUPER_ADMIN_EMAIL,
      SUPER_ADMIN_PHONE,
      SUPER_ADMIN_PASSWORD,
      SUPER_ADMIN_FIRSTNAME,
      SUPER_ADMIN_LASTNAME,
    } = process.env;
    console.log(
      `-------------------------${SUPER_ADMIN_EMAIL}---------------------${process.env.SUPER_ADMIN_EMAIL}`,
    );
    const admin = new UserDto();
    admin.firstname = SUPER_ADMIN_FIRSTNAME;
    admin.lastname = SUPER_ADMIN_LASTNAME;
    admin.email = SUPER_ADMIN_EMAIL;
    admin.pin = SUPER_ADMIN_PASSWORD;
    admin.isAdmin = true;
    admin.isAgent = false;
    admin.phone = SUPER_ADMIN_PHONE;
    admin.roleId = 1;
    try {
        // await this.create(admin);
    } catch (error) {
      console.log(error);
    }

    // console.log(admin);
  }
  @Post('')
  create(@Body() user: UserDto) {
    console.log('---------------------create user--------------------', user);
    return this.userService.create(user);
  }

  @Get()
  // @UseGuards(LocalAuthGuard)
  // @ApiBearerAuth()
  getAllUser() {
    return this.userService.getAllUser();
  }

  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }
  @Put(':id')
  updateUserById(@Param('id') id: number, @Body() user: UserDto) {
    user.id = id;
    return this.userService.updateUserById(user);
  }
}
