import { ApiProperty, PartialType } from '@nestjs/swagger';
import { FileDocument } from 'src/typeorm';

export class FileDocumentDto extends PartialType(FileDocument) {
  [x: string]: any;
  @ApiProperty()
  fieldname!: string;
  @ApiProperty()
  originalname!: string;
  @ApiProperty()
  encoding!: string;
  @ApiProperty()
  mimetype!: string;
  @ApiProperty()
  destination!: string;
  @ApiProperty()
  filename!: string;
  @ApiProperty()
  path!: string;
  @ApiProperty()
  size!: number;
  @ApiProperty()
  createdDate?: Date;
  @ApiProperty()
  updatedDate?: Date;
}
