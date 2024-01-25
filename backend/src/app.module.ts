import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import config from 'mysql.config';
import { join } from 'path';
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

@Module({
  imports: [
    SecurityModule,
    ServeStaticModule.forRoot({
      serveRoot: '/v1/upload',
      serveStaticOptions: {
        index: 'upload',
      },
      rootPath: join(__dirname, '../..', 'upload'), // Path to the static files directory
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(config),
    ModuleModule,
    CategoryModule,
    RoleModule,
    PermissionModule,
    RolePermissionModule,
    PartnerModule,
    UserModule,
    ProductModule,
    WebServiceModule,
    WalletStatusModule
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
