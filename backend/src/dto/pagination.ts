import { ApiProperty } from '@nestjs/swagger';

export class IPagination {
  @ApiProperty() page?: number;
  @ApiProperty() pageSize?: number;
  @ApiProperty() search?: string;
  @ApiProperty() fromDate?: string;
}
export interface IPaginationResult<T> {
  total: number;
  pageLenght: number;
  page: number;
  data: T;
}
