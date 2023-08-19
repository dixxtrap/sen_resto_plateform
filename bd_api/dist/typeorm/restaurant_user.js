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
exports.RestaurantUser = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
let RestaurantUser = class RestaurantUser {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RestaurantUser.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], RestaurantUser.prototype, "restaurantId", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], RestaurantUser.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], RestaurantUser.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.Restaurant),
    __metadata("design:type", Array)
], RestaurantUser.prototype, "restaurant", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.User),
    __metadata("design:type", Array)
], RestaurantUser.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], RestaurantUser.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], RestaurantUser.prototype, "updatedAt", void 0);
RestaurantUser = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Index)(['userId', 'restaurantId'])
], RestaurantUser);
exports.RestaurantUser = RestaurantUser;
//# sourceMappingURL=restaurant_user.js.map