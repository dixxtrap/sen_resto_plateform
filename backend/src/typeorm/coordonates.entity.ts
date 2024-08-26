import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class Coordonates {
  @Column('double', { default: 0.0 })
  latitude: number;
  @Column('double', { default: 0.0 })
  longitude: number;
}

export class CoordonatesDto {
  @ApiProperty()
  latitude: number;
  @ApiProperty()
  longitude: number;
}
