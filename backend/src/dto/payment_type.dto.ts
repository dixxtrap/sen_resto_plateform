import { ApiProperty } from '@nestjs/swagger';
import { FileDocumentDto } from './file.dto';

export class PaymentTypeDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  createById: number;
  profile: FileDocumentDto;
  @ApiProperty()
  fees: number;
  @ApiProperty()
  feesInvert: number;
  @ApiProperty()
  isActive: boolean;
  @ApiProperty()
  description: string;
}
