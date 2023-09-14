"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const mysql_config_1 = require("./mysql.config");
const user_module_1 = require("./modules/user/user.module");
const company_module_1 = require("./modules/company/company.module");
const permission_module_1 = require("./modules/permission/permission.module");
const config_1 = require("@nestjs/config");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const document_file_module_1 = require("./modules/document_file/document_file.module");
const order_module_1 = require("./modules/order/order.module");
const plate_module_1 = require("./modules/plate/plate.module");
const tag_module_1 = require("./modules/tag/tag.module");
const module_1 = require("./modules/customer/module");
const security_module_1 = require("./modules/security/security.module");
const payment_type_module_1 = require("./modules/payment_type/payment_type.module");
const jtw_1 = require("./jtw");
const module_2 = require("./modules/role/module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jtw_1.JWT,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'upload'),
            }),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRoot(mysql_config_1.default),
            permission_module_1.PermissionModule,
            user_module_1.UserModule,
            module_1.CustomerModule,
            company_module_1.CompanyModule,
            document_file_module_1.DocumentModule,
            order_module_1.OrderModule,
            plate_module_1.PlateModule,
            tag_module_1.TagModule,
            security_module_1.SecurityModule,
            payment_type_module_1.PaymentTypeModule,
            module_2.RoleModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map