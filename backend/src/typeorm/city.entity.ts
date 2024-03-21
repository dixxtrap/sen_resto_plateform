import { ManyToOne, Entity, OneToMany, Column } from 'typeorm';
import { AddressBase, AddressBaseDto } from './address.entity';
import { ApiProperty } from '@nestjs/swagger';
@Entity()
export class Region extends AddressBase {
  @OneToMany(() => City, (e) => e.region)
  city: City[];
}
export class RegionDto extends AddressBaseDto {}
@Entity()
export class City extends AddressBase {
  @ManyToOne(() => Region)
  region: Region;
  @Column({ default: null, nullable: true })
  regionId: number;
  @OneToMany(() => Commune, (e) => e.city)
  city: Commune[];
}
export class CityDto extends AddressBaseDto {
  @ApiProperty()
  regionId: number;
}
@Entity()
export class Commune extends AddressBase {
  @ManyToOne(() => City)
  city: City;
  @Column({ default: null, nullable: true })
  cityId: number;
}
export class CommuneDto extends AddressBaseDto {
  @ApiProperty()
  cityId: number;
}
