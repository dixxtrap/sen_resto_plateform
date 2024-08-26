import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}
export class DefinePasswordDto {
  @ApiProperty()
  token: string;
  @ApiProperty()
  password: string;
}
