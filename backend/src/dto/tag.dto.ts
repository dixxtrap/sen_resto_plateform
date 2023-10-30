import { ApiProperty } from '@nestjs/swagger';

export class TagDto {
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
}
