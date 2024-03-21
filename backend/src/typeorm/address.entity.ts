import { ApiProperty } from '@nestjs/swagger';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Address {
  @Column({ default: null, nullable: true })
  streetAddress: string;
  @Column('varchar', { default: null, nullable: true })
  city: string;
  @Column('varchar', { default: null, nullable: true })
  country: string;
  @Column('varchar', { default: null, nullable: true })
  postalCode: string;
}

export class AddressDto {
  @ApiProperty()
  streetAddress: string;
  @ApiProperty()
  city: string;
  @ApiProperty()
  country: string;
  @ApiProperty()
  postalCode: string;
}

export class AddressBase {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
}
export class AddressBaseDto {
  @ApiProperty()
  name: string;
}
