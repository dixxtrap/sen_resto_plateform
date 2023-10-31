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
exports.RestaurantContactDto = exports.CompanyContactDto = exports.ContactDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("../typeorm");
class ContactDto extends (0, swagger_1.PartialType)(typeorm_1.Contact) {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ContactDto.prototype, "adress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ContactDto.prototype, "firstname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ContactDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ContactDto.prototype, "lastname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ContactDto.prototype, "telephhone", void 0);
exports.ContactDto = ContactDto;
class CompanyContactDto extends (0, swagger_1.IntersectionType)(ContactDto, typeorm_1.CompanyContact) {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CompanyContactDto.prototype, "companyId", void 0);
exports.CompanyContactDto = CompanyContactDto;
class RestaurantContactDto extends (0, swagger_1.IntersectionType)(ContactDto, typeorm_1.RestaurantContact) {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RestaurantContactDto.prototype, "restaurantId", void 0);
exports.RestaurantContactDto = RestaurantContactDto;
//# sourceMappingURL=contact.dto.js.map