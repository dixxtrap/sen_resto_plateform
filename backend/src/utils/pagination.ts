import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class PaginationDto {
  @ApiProperty({required:false})
  page: number;
  @ApiProperty({required:false})
  perPage: number;
  @ApiProperty({required:false})
  fromDate: number;
  @ApiProperty({required:false})
  toDate: number;
  @ApiProperty({required:false})
  search: string;
}
