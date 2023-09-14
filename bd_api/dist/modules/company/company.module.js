"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyModule = void 0;
const common_1 = require("@nestjs/common");
const company_service_1 = require("./company.service");
const company_controller_1 = require("./company.controller");
const typeorm_1 = require("../../typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const restaurant_controller_1 = require("./restaurant.controller");
const permission_module_1 = require("../permission/permission.module");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const document_file_module_1 = require("../document_file/document_file.module");
const jtw_1 = require("../../jtw");
let CompanyModule = class CompanyModule {
};
CompanyModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jtw_1.JWT,
            platform_express_1.MulterModule.register({
                preservePath: false,
                dest: 'upload',
                storage: (0, multer_1.diskStorage)({
                    destination: 'upload',
                }),
            }),
            typeorm_2.TypeOrmModule.forFeature([
                typeorm_1.Company,
                typeorm_1.Restaurant,
                typeorm_1.CompanyContact,
                typeorm_1.RestaurantContact,
                typeorm_1.User,
            ]),
            permission_module_1.PermissionModule,
            document_file_module_1.DocumentModule,
        ],
        controllers: [company_controller_1.CompanyController, restaurant_controller_1.RestaurantController],
        providers: [company_service_1.CompanyService],
        exports: [company_service_1.CompanyService],
    })
], CompanyModule);
exports.CompanyModule = CompanyModule;
//# sourceMappingURL=company.module.js.map