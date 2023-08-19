import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Restaurant } from 'src/typeorm';
import { FileDocumentDto } from './file.dto';

export class RestaurantDto  {
  @ApiProperty()
  name: string;
  @ApiProperty()
  locality: string;
  @ApiProperty()
  companyId?: number;
  @ApiProperty()
  laltitude?: number;
  @ApiProperty()
  longitude?: number;
  @ApiProperty()
  email: string;
  @ApiProperty()
  profile: FileDocumentDto;
}
