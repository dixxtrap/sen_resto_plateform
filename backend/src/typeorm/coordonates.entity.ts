import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class Coordonates {
  @Column('decimal',{default:0})
  latitude: number;
  @Column('decimal',{default:0})
  longitude: number;
}

export class CoordonatesDto {
  @ApiProperty()
  latitude: number;
  @ApiProperty()
  longitude: number;
}
