import { ApiProperty, PartialType } from '@nestjs/swagger';
import { FileDocument, User } from 'src/typeorm';
import { FileDocumentDto } from './file.dto';

export class UserDto {
  [x: string]: any;
  @ApiProperty()
  firstname: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  lastname: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  address: string;
  @ApiProperty()
  city: string;
  @ApiProperty()
  isAgent: boolean;
  @ApiProperty()
  isAdmin: boolean;
  @ApiProperty()
  country: string;
  @ApiProperty()
  birthday: Date;
  @ApiProperty()
  pin: string;
}

export class SignInDto {
  @ApiProperty()
  password: string;
  @ApiProperty({ example: 'Djiga2015@gmail.com' })
  email: string;
}
