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

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, CompanyRestaurantBase, Partner]),
    SecurityModule
  ],
  controllers: [WsCompanyController, WsProductController, WsCustomerController],
  providers: [WsProductService, WsCompanyService, WsCustomerService],
})
export class WebServiceModule {}
