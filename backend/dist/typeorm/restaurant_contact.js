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
exports.RestaurantContact = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
const contact_1 = require("./contact");
let RestaurantContact = class RestaurantContact extends contact_1.Contact {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], RestaurantContact.prototype, "restaurantId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.Restaurant),
    __metadata("design:type", _1.Restaurant)
], RestaurantContact.prototype, "restaurant", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], RestaurantContact.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], RestaurantContact.prototype, "updatedAt", void 0);
RestaurantContact = __decorate([
    (0, typeorm_1.Entity)()
], RestaurantContact);
exports.RestaurantContact = RestaurantContact;
//# sourceMappingURL=restaurant_contact.js.map