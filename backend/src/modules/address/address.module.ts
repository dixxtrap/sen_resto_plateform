import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City, Commune, Region } from 'src/typeorm/city.entity';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
@Module({
  imports: [TypeOrmModule.forFeature([Region, City, Commune])],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
