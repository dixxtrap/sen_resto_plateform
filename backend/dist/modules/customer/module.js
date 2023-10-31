"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("../../typeorm");
const controller_1 = require("./controller");
const service_1 = require("./service");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
let CustomerModule = class CustomerModule {
};
CustomerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.register({
                secret: process.env.API_KEY,
                signOptions: {
                    expiresIn: '2y',
                },
            }),
            typeorm_1.TypeOrmModule.forFeature([typeorm_2.Customer])
        ],
        controllers: [controller_1.CustomerController],
        providers: [service_1.CustomerService],
    })
], CustomerModule);
exports.CustomerModule = CustomerModule;
//# sourceMappingURL=module.js.map