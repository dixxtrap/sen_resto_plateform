import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City, Commune, Region } from 'src/typeorm/city.entity';
import { Repository } from 'typeorm';
@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Region) private region: Repository<Region>,
    @InjectRepository(City) private city: Repository<City>,
    @InjectRepository(Commune) private commune: Repository<Commune>,
  ) {}
}
