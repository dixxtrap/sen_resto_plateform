import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './mysql.config';
import { UserModule } from './modules/user/user.module';
import { CompanyModule } from './modules/company/company.module';
import { PermissionModule } from './modules/permission/permission.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DocumentModule } from './modules/document_file/document_file.module';
import { OrderModule } from './modules/order/order.module';
import { PlateModule } from './modules/plate/plate.module';
import { TagModule } from './modules/tag/tag.module';
import { Customer } from './typeorm';
import { CustomerModule } from './modules/customer/module';
import { SecurityModule } from './modules/security/security.module';
import { PaymentTypeModule } from './modules/payment_type/payment_type.module';
import { JWT } from './jtw';
import { RoleModule } from './modules/role/module';
@Module({
  imports: [
    JWT,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'upload'), // Path to the static files directory
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(config),
    PermissionModule,
    UserModule,
    CustomerModule,
    CompanyModule,

    DocumentModule,
    OrderModule,
    PlateModule,
    TagModule,
    SecurityModule,
    PaymentTypeModule,
    RoleModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
