import { ApiProperty } from '@nestjs/swagger';

export class PermissionDto {
  id?: number;
  isActive?: boolean;
  @ApiProperty()
  sousModule: string;
  @ApiProperty({ enum: ['CREATE', 'UPDATE', 'READ', 'DELETE'] })
  type: string;
}
