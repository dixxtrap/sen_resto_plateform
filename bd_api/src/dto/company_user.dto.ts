import { ApiProperty } from '@nestjs/swagger';
import { CompanyDto } from './company.dto';
import { UserDto } from './user.dto';

export class CompanyUserDto {
  @ApiProperty() companyId: number;
  @ApiProperty() userId: number;
}

export class CompanyUserDtoUpdate extends CompanyUserDto {
  @ApiProperty() id: number;
  @ApiProperty() isActive: boolean;
}

export class CompanyUserDtoGet extends CompanyUserDto {
  @ApiProperty() isActive: boolean;
  @ApiProperty() company: CompanyDto;
  @ApiProperty() User: UserDto;
}
