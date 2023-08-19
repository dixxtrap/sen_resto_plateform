import { ApiProperty } from '@nestjs/swagger';

export class CustomerDto {
  @ApiProperty() phone: string;
  @ApiProperty() displayName: string;
  @ApiProperty() isPhoneVeirified: boolean;
  @ApiProperty() laltitude: number;
  @ApiProperty() longitude: number;
}
