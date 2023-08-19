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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyUserDtoGet = exports.CompanyUserDtoUpdate = exports.CompanyUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const company_dto_1 = require("./company.dto");
const user_dto_1 = require("./user.dto");
class CompanyUserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CompanyUserDto.prototype, "companyId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CompanyUserDto.prototype, "userId", void 0);
exports.CompanyUserDto = CompanyUserDto;
class CompanyUserDtoUpdate extends CompanyUserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CompanyUserDtoUpdate.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], CompanyUserDtoUpdate.prototype, "isActive", void 0);
exports.CompanyUserDtoUpdate = CompanyUserDtoUpdate;
class CompanyUserDtoGet extends CompanyUserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], CompanyUserDtoGet.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", company_dto_1.CompanyDto)
], CompanyUserDtoGet.prototype, "company", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", user_dto_1.UserDto)
], CompanyUserDtoGet.prototype, "User", void 0);
exports.CompanyUserDtoGet = CompanyUserDtoGet;
//# sourceMappingURL=company_user.dto.js.map