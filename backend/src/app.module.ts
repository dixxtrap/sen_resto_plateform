import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import config from './mysql.config';
import { ModuleModule } from './modules/module/module.module';
import { CategoryModule } from './modules/category/category.module';
import { RoleModule } from './modules/role/role.module';
import { PermissionModule } from './modules/permission/permssion.module';
import { RolePermissionModule } from './modules/role_permsion/role_permission.module';
import { PartnerModule } from './modules/partner/partner.module';
import { UserModule } from './modules/user/user.module';
import { SecurityModule } from './modules/security/security.module';
import { ProductModule } from './modules/product/product.module';
import { WebServiceModule } from './modules/web_service/web_service.module';
import { WalletStatusModule } from './modules/wallet_status/wallet_status.module';
import { ExcelModule } from './modules/excel/excel.module';
import { OtpConfigModule } from './modules/otp_config/otp.module';
import { EmailerModule } from './modules/mailer/mailer.module';
import { CardModule } from './modules/card/card.module';
import { S3Module } from './modules/s3/s3.module';
import { BannerModule } from './modules/banner/banner.module';
import { OtpModule } from './modules/otp/otp.module';
import { ProductRaitingModule } from './modules/product_rating/product_rating.module';
import { CityModule } from './modules/city/city.module';
import { OrderModule } from './modules/order/order.module';
import { DatabaseModule } from './modules/database/database.module';
import { GiftModule } from './modules/gift/gift.module';
@Module({
  imports: [
    DatabaseModule,

    SecurityModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ModuleModule,
    CategoryModule,
    RoleModule,
    PermissionModule,
    RolePermissionModule,
    PartnerModule,
    UserModule,
    OrderModule,
    ProductModule,
    WebServiceModule,
    WalletStatusModule,
    ExcelModule,
    OtpModule,
    EmailerModule,
    CardModule,
    S3Module,
    BannerModule,
    OtpConfigModule,
    ProductRaitingModule,
    CityModule,
    GiftModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
