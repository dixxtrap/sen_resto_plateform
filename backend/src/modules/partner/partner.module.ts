import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partner } from 'src/typeorm';
import { CompanyShop } from 'src/typeorm/partner/company_shop.entity';
import { Customer } from 'src/typeorm/partner/customer.entity';
import { Deliver } from 'src/typeorm/partner/deliver.entity';
import { CompanyController } from './company/company.controller';
import { CompanyService } from './company/company.service';
import { ShopController } from './shop/shop.controller';
import { ShopService } from './shop/shop.service';
import { CustomerService } from './customer/customer.service';
import { CustomerController } from './customer/customer.controller';
import { DeliverController } from './deliver/deliver.controller';
import { DeliverService } from './deliver/deliver.service';
import { MulterConfig } from 'src/utils/multer.config';
import { PartnerService } from './partner.service';

import { WalletStatusModule } from '../wallet_status/wallet_status.module';
// import { PaymentType } from 'src/typeorm/payment_type.entity';

import { S3Module } from '../s3/s3.module';

@Module({
  imports: [MulterConfig, WalletStatusModule, S3Module],
  controllers: [
    CompanyController,
    ShopController,
    CustomerController,
    DeliverController,
    // PartnerController,
    // PaymentTypeController,
    // CoorporateController,
  ],
  providers: [
    PartnerService,
    CompanyService,
    ShopService,
    CustomerService,
    DeliverService,
    // PaymentTypeService,
    // CoorporateService,
  ],
  exports: [
    CompanyService,
    ShopService,
    CustomerService,
    DeliverService,
  ],
})
export class PartnerModule {}
