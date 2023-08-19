import { ApiProperty } from '@nestjs/swagger';

export class PermissionDto {
  @ApiProperty()
  sousModule: string;
  @ApiProperty({ enum: ['CREATE', 'UPDATE', 'READ', 'DELETE'] })
  type: string;
}
