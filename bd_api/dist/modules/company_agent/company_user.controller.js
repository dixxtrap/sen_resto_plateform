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
exports.CompanyUserController = void 0;
const common_1 = require("@nestjs/common");
const company_user_service_1 = require("./company_user.service");
const swagger_1 = require("@nestjs/swagger");
const company_user_dto_1 = require("../../dto/company_user.dto");
let CompanyUserController = class CompanyUserController {
    constructor(service) {
        this.service = service;
    }
    getS() {
        return this.service.getS();
    }
    get(id) {
        return this.service.get(id);
    }
    create(item) {
        return this.service.create(item);
    }
    update(id) {
        return this.service.update(id);
    }
};
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiResponse)({ type: [company_user_dto_1.CompanyUserDtoGet], status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CompanyUserController.prototype, "getS", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiResponse)({ type: company_user_dto_1.CompanyUserDtoGet, status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CompanyUserController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({ type: company_user_dto_1.CompanyUserDtoGet, status: 200 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [company_user_dto_1.CompanyUserDto]),
    __metadata("design:returntype", void 0)
], CompanyUserController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiResponse)({
        type: () => {
            return { affected: 0 };
        },
        status: 200,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CompanyUserController.prototype, "update", null);
CompanyUserController = __decorate([
    (0, swagger_1.ApiTags)('company_agent'),
    (0, common_1.Controller)('company_agent'),
    __metadata("design:paramtypes", [company_user_service_1.CompanyUserService])
], CompanyUserController);
exports.CompanyUserController = CompanyUserController;
//# sourceMappingURL=company_user.controller.js.map