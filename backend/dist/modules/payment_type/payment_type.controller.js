"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentTypeController = void 0;
const common_1 = require("@nestjs/common");
const payment_type_service_1 = require("./payment_type.service");
const swagger_1 = require("@nestjs/swagger");
const payment_type_dto_1 = require("../../dto/payment_type.dto");
const local_auth_guard_1 = require("../../middleware/local_auth.guard");
let PaymentTypeController = class PaymentTypeController {
    constructor(service) {
        this.service = service;
    }
    getS() {
        return this.service.getS();
    }
    get(id) {
        return this.service.get(id);
    }
    post(body, req) {
        return this.service.post(body, req['user']);
    }
    update(body, id, req) {
        return this.service.update(id, Object.assign(Object.assign({}, body), { createById: req['user'].id }));
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PaymentTypeController.prototype, "getS", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PaymentTypeController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_type_dto_1.PaymentTypeDto, Object]),
    __metadata("design:returntype", void 0)
], PaymentTypeController.prototype, "post", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_type_dto_1.PaymentTypeDto, Number, Object]),
    __metadata("design:returntype", void 0)
], PaymentTypeController.prototype, "update", null);
PaymentTypeController = __decorate([
    (0, swagger_1.ApiTags)('payment_type'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('payment_type'),
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    __metadata("design:paramtypes", [payment_type_service_1.PaymentTypeService])
], PaymentTypeController);
exports.PaymentTypeController = PaymentTypeController;
//# sourceMappingURL=payment_type.controller.js.map