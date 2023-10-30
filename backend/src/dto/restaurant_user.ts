import { ApiProperty } from '@nestjs/swagger';
import { RestaurantDto } from './restaurant.dto';
import { UserDto } from './user.dto';

export class RestaurantUserDto {
  @ApiProperty() companyId: number;
  @ApiProperty() userId: number;
}

export class RestaurantUserDtoUpdate extends RestaurantUserDto {
  @ApiProperty() id: number;
  @ApiProperty() isActive: boolean;
}

export class RestaurantUserDtoGet extends RestaurantUserDto {
  @ApiProperty() isActive: boolean;
  @ApiProperty() company: RestaurantDto;
  @ApiProperty() User: UserDto;
}
