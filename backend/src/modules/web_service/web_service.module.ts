import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyRestaurantBase, Partner } from 'src/typeorm';
import { Product } from 'src/typeorm/product.entity';
import { WsProductService } from './product/product.service';
import { WsCompanyController } from './company/company.controller';
import { WsProductController } from './product/product.controller';
import { WsCompanyService } from './company/company.service';
import { CustomerController } from '../partner/customer/customer.controller';
import { CustomerService } from '../partner/customer/customer.service';
import { SecurityModule } from '../security/security.module';
import { WsCustomerController } from './customer/customer.controller';
import { WsCustomerService } from './customer/customer.service';
import { Customer } from 'src/typeorm/customer.entity';
import { MailerModule } from '../mailer/mailer.module';
import { OtpModule } from '../otp/otp.module';
import { Banner } from 'src/typeorm/banner.entity';
import { WsBannerController } from './banner/banner.controller';
import { WsBannerService } from './banner/banner.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Customer,
      CompanyRestaurantBase,
      Partner,
      Banner,
    ]),
    SecurityModule,
    MailerModule,
    OtpModule,
  ],
  controllers: [
    WsCompanyController,
    WsProductController,
    WsCustomerController,
    WsBannerController,
  ],
  providers: [
    WsProductService,
    WsCompanyService,
    WsCustomerService,
    WsBannerService,
  ],
})
export class WebServiceModule {}
