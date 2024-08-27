import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRaiting } from 'src/typeorm/product_rating.entity';

@Module({
  imports: [],
})
export class ProductRaitingModule {}
