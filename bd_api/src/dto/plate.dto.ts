import { ApiProperty } from '@nestjs/swagger';
import { RestaurantDto } from './restaurant.dto';
import { UserDto } from './user.dto';
import { TagDto } from './tag.dto';

export class PlateDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  restaurantId: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  cookingTime: number;
  @ApiProperty()
  price: number;
  @ApiProperty()
  reduction: number;
  @ApiProperty()
  tag: [TagDto];
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  createdAt: Date;
}

export class GetPalteDto extends PlateDto {
  @ApiProperty()
  resaturant: RestaurantDto;
}
