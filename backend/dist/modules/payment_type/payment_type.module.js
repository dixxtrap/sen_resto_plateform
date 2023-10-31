"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentTypeModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("../../typeorm");
const payment_type_controller_1 = require("./payment_type.controller");
const payment_type_service_1 = require("./payment_type.service");
const jtw_1 = require("../../jtw");
let PaymentTypeModule = class PaymentTypeModule {
};
PaymentTypeModule = __decorate([
    (0, common_1.Module)({
        imports: [jtw_1.JWT, typeorm_1.TypeOrmModule.forFeature([typeorm_2.PaymentType, typeorm_2.PaymentTypeHistory])],
        controllers: [payment_type_controller_1.PaymentTypeController],
        providers: [payment_type_service_1.PaymentTypeService],
    })
], PaymentTypeModule);
exports.PaymentTypeModule = PaymentTypeModule;
//# sourceMappingURL=payment_type.module.js.map