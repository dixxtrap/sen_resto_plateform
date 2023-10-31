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
exports.RestaurantUserDtoGet = exports.RestaurantUserDtoUpdate = exports.RestaurantUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const restaurant_dto_1 = require("./restaurant.dto");
const user_dto_1 = require("./user.dto");
class RestaurantUserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RestaurantUserDto.prototype, "companyId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RestaurantUserDto.prototype, "userId", void 0);
exports.RestaurantUserDto = RestaurantUserDto;
class RestaurantUserDtoUpdate extends RestaurantUserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RestaurantUserDtoUpdate.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], RestaurantUserDtoUpdate.prototype, "isActive", void 0);
exports.RestaurantUserDtoUpdate = RestaurantUserDtoUpdate;
class RestaurantUserDtoGet extends RestaurantUserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], RestaurantUserDtoGet.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", restaurant_dto_1.RestaurantDto)
], RestaurantUserDtoGet.prototype, "company", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", user_dto_1.UserDto)
], RestaurantUserDtoGet.prototype, "User", void 0);
exports.RestaurantUserDtoGet = RestaurantUserDtoGet;
//# sourceMappingURL=restaurant_user.js.map