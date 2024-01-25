import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partner } from 'src/typeorm';
import {
  CompanyRestaurant,
  CompanyRestaurantBase,
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
import { PartnerService } from './partner.service';
import { PartnerController } from './partner.controller';
import { WalletStatusModule } from '../wallet_status/wallet_status.module';
import { PaymentType } from 'src/typeorm/payment_type.entity';
import { PaymentTypeController } from './payment_type/payment_type.controller';
import { PaymentTypeService } from './payment_type/payment_type.service';

@Module({
  imports: [
    MulterConfig,
    TypeOrmModule.forFeature([
      Partner,
      Deliver,
      Customer,
      Restaurant,
      CompanyRestaurant,
      CompanyRestaurantBase,
      PaymentType,
    ]),
    WalletStatusModule,
  ],
  controllers: [
    CompanyRestaurantController,
    RestaurantController,
    CustomerController,
    DeliverController,
    PartnerController,
    PaymentTypeController,
  ],
  providers: [
    PartnerService,
    CompanyRestaurantService,
    RestaurantService,
    CustomerService,
    DeliverService,
    PaymentTypeService,
  ],
  exports: [
    CompanyRestaurantService,
    RestaurantService,
    CustomerService,
    DeliverService,
  ],
})
export class PartnerModule {}
