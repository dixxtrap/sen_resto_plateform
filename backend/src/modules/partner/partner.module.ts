import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partner } from 'src/typeorm';
import {
  CompanyRestaurant,
  Restaurant,
} from 'src/typeorm/company_restaurant.entity';
import { Customer } from 'src/typeorm/customer.entity';
import { Deliver } from 'src/typeorm/deliver.entity';
import { CompanyRestaurantController } from './company_restaurant/company.controller';
import { CompanyRestaurantService } from './company_restaurant/company.service';
import { RestaurantController } from './restaurant/restaurant.controller';
import { RestaurantService } from './restaurant/restaurant.service';
import { CustomerService } from './customer/customer.service';
import { CustomerController } from './customer/customer.controller';
import { DeliverController } from './deliver/deliver.controller';
import { DeliverService } from './deliver/deliver.service';
import { MulterConfig } from 'src/utils/multer.config';

@Module({
  imports: [
    MulterConfig,
    TypeOrmModule.forFeature([
      Partner,
      Deliver,
      Customer,
      Restaurant,
      CompanyRestaurant,
    ]),
  ],
  controllers: [
    CompanyRestaurantController,
    RestaurantController,
    CustomerController,
    DeliverController,
  ],
  providers: [
    CompanyRestaurantService,
    RestaurantService,
    CustomerService,
    DeliverService,
  ],
  exports : [
    CompanyRestaurantService,
    RestaurantService,
    CustomerService,
    DeliverService,
  ],
})
export class PartnerModule {}
