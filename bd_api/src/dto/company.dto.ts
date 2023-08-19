import { ApiProperty,  } from '@nestjs/swagger';
import { RestaurantDto } from './restaurant.dto';
import { FileDocumentDto } from './file.dto';
export class CompanyDto {
  [x: string]: any;
  @ApiProperty()
  name: string;
  @ApiProperty()
  short_name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  laltitude: number;
  @ApiProperty()
  longitude: number;
  profile!: FileDocumentDto;
  userId: number;
}
export class CompanyDtoRsetos {
  @ApiProperty()
  name: string;
  @ApiProperty({ type: [RestaurantDto], description: 'List of restaurant' })
  restaurants: [RestaurantDto];
}

export class UpdateCompanyDto {
  @ApiProperty()
  name?: string;
  @ApiProperty()
  laltitude;
}
