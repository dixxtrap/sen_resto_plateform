import { ApiProperty } from '@nestjs/swagger';
import { FileDocumentDto } from './file.dto';

export class RestaurantDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  locality: string;
  @ApiProperty()
  companyId?: number;
  @ApiProperty()
  description: string;
  @ApiProperty()
  laltitude?: number;
  @ApiProperty()
  longitude?: number;
  @ApiProperty()
  email: string;
  @ApiProperty()
  profile: FileDocumentDto;
}
