import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partner } from 'src/typeorm';
import { Product } from 'src/typeorm/product.entity';
import { WsProductService } from './product/product.service';
import { WsCompanyController } from './company/company.controller';
import { WsProductController } from './product/product.controller';
import { WsCompanyService } from './company/company.service';
import { SecurityModule } from '../security/security.module';
import { WsCustomerController } from './customer/customer.controller';
import { WsCustomerService } from './customer/customer.service';

import { EmailerModule } from '../mailer/mailer.module';
import { OtpModule } from '../otp/otp.module';
import { Banner } from 'src/typeorm/banner.entity';
import { WsBannerController } from './banner/banner.controller';
import { WsBannerService } from './banner/banner.service';
import { WsOrderController } from './order/order.controller';
import { WsOrderService } from './order/order.service';

import { ProductModule } from '../product/product.module';
// import { WsPaymentTypeController } from './payment_type/payment_type.controller';
// import { WsPaymentTypeService } from './payment_type/payment_type.service';
import { WsStoryController } from './story/story.controller';
import { WsStoryService } from './story/story.service';
import { WsDeliverService } from './deliver/deliver.service';
import { WsDeliverController } from './deliver/deliver.controller';
import { WsController } from './web_service.controller';
import { WsService } from './web_service.service';

@Module({
  imports: [
    SecurityModule,
    EmailerModule,
    OtpModule,
    ProductModule,

  ],
  controllers: [
    WsCompanyController,
    WsProductController,
    WsCustomerController,
    WsBannerController,
    WsOrderController, WsDeliverController, WsController,
    // WsPaymentTypeController,
    WsStoryController
  ],
  providers: [
    WsProductService,
    WsCompanyService,
    WsCustomerService,
    WsBannerService,
    WsOrderService, WsDeliverService, WsService,
    // WsPaymentTypeService,
    WsStoryService,
  ],
})
export class WebServiceModule { }
