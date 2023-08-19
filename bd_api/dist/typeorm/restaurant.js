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
exports.Restaurant = void 0;
const typeorm_1 = require("typeorm");
const company_1 = require("./company");
const _1 = require(".");
let Restaurant = class Restaurant {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Restaurant.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], Restaurant.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 30 }),
    __metadata("design:type", String)
], Restaurant.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { nullable: true }),
    __metadata("design:type", Number)
], Restaurant.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], Restaurant.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 100, default: 'Dakar' }),
    __metadata("design:type", String)
], Restaurant.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 100, default: 'Senegal' }),
    __metadata("design:type", String)
], Restaurant.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 20 }),
    __metadata("design:type", String)
], Restaurant.prototype, "postal_code", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 20 }),
    __metadata("design:type", String)
], Restaurant.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Restaurant.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Restaurant.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('float', { default: 0.0 }),
    __metadata("design:type", Number)
], Restaurant.prototype, "laltitude", void 0);
__decorate([
    (0, typeorm_1.Column)('float', { default: 0.0 }),
    __metadata("design:type", Number)
], Restaurant.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)('bool', { default: false }),
    __metadata("design:type", Boolean)
], Restaurant.prototype, "isDelecetd", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => _1.FileDocument, {
        cascade: true,
        onUpdate: 'NO ACTION',
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", _1.FileDocument)
], Restaurant.prototype, "profile", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_1.Company, (company) => company.restaurants, {
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
        nullable: true,
    }),
    __metadata("design:type", company_1.Company)
], Restaurant.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.RestaurantContact, (rest) => rest.restaurant),
    __metadata("design:type", _1.RestaurantContact)
], Restaurant.prototype, "contact", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time' }),
    __metadata("design:type", String)
], Restaurant.prototype, "openingTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time' }),
    __metadata("design:type", String)
], Restaurant.prototype, "closingTime", void 0);
Restaurant = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Index)(['name', 'companyId'], { unique: true, nullFiltered: true })
], Restaurant);
exports.Restaurant = Restaurant;
//# sourceMappingURL=restaurant.js.map