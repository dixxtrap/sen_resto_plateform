import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/user';
import { Repository } from 'typeorm';
import { SignInDto, UserDto } from '../../dto/user.dto';
import { UserService } from './user.service';
import { LocalAuthGuard } from 'src/middleware/local_auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('')
  create(@Body() user: UserDto) {
    console.log('---------------------create user--------------------', user);
    return this.userService.create(user);
  }
  // @Post('upload')
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     dest: './upload/profile',
  //     storage: diskStorage({
  //       destination: './upload/profile', // Dossier de destination où les fichiers téléchargés seront stockés
  //       filename: (req, file, callback) => {
  //         const randomName = Array(32)
  //           .fill(null)
  //           .map(() => Math.round(Math.random() * 16).toString(16))
  //           .join('');

  //         return callback(null, `${randomName}${extname(file.originalname)}`);
  //       },
  //     }),
  //   }),
  // )
  // upload(
  //   @UploadedFile()
  //   file: Express.Multer.File,
  //   @Body() data: any,
  // ) {
  //   console.log(file, data);
  //   return { path: file.path, url: file.destination, status: 'OK' };
  // }
  // @Post('signin')
  // SigIn(@Body() credential: SignInDto) {
  //   return this.userService.signIn(credential);
  // }
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
