import { Module } from '@nestjs/common';
import { RestaurantUserController } from './restaurant_user.controller';
import { RestaurantUserService } from './restaurant_user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantUser } from 'src/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([RestaurantUser])],
  controllers: [RestaurantUserController],
  providers: [RestaurantUserService],
})
export class RestaurantUserModule {}
