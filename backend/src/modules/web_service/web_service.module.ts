import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyRestaurantBase, Partner } from 'src/typeorm';
import { Product } from 'src/typeorm/product.entity';
import { WsProductService } from './product/product.service';
import { WsCompanyController } from './company/company.controller';
import { WsProductController } from './product/product.controller';
import { WsCompanyService } from './company/company.service';
import { SecurityModule } from '../security/security.module';
import { WsCustomerController } from './customer/customer.controller';
import { WsCustomerService } from './customer/customer.service';
import { Customer } from 'src/typeorm/customer.entity';
import { EmailerModule } from '../mailer/mailer.module';
import { OtpModule } from '../otp/otp.module';
import { Banner } from 'src/typeorm/banner.entity';
import { WsBannerController } from './banner/banner.controller';
import { WsBannerService } from './banner/banner.service';
import { WsCategoryController } from './category/category.controller';
import { WsCategoryService } from './category/category.service';
import { Category } from 'src/typeorm/category.entity';
import { WsOrderController } from './order/order.controller';
import { WsOrderService } from './order/order.service';
import { Order } from 'src/typeorm/order.entity';
import { OrderProduct } from '../../typeorm/order_product.entity';
import { ProductModule } from '../product/product.module';
import { WsPaymentTypeController } from './payment_type/payment_type.controller';
import { WsPaymentTypeService } from './payment_type/payment_type.service';
import { PaymentType } from 'src/typeorm/payment_type.entity';
import { WsStoryController } from './story/story.controller';
import { WsStoryService } from './story/story.service';

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
    WsCategoryController,
    WsOrderController,
    WsPaymentTypeController,
    WsStoryController
  ],
  providers: [
    WsProductService,
    WsCompanyService,
    WsCustomerService,
    WsBannerService,
    WsCategoryService,
    WsOrderService,
    WsPaymentTypeService,
    WsStoryService
  ],
})
export class WebServiceModule {}
