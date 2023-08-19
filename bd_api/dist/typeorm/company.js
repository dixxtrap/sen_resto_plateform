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
exports.Company = void 0;
const typeorm_1 = require("typeorm");
const restaurant_1 = require("./restaurant");
const document_1 = require("./document");
let Company = class Company {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Company.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], Company.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], Company.prototype, "short_name", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 30 }),
    __metadata("design:type", String)
], Company.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { default: '' }),
    __metadata("design:type", String)
], Company.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], Company.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 100, default: 'Dakar' }),
    __metadata("design:type", String)
], Company.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 100, default: 'Senegal' }),
    __metadata("design:type", String)
], Company.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 20, nullable: true }),
    __metadata("design:type", String)
], Company.prototype, "postal_code", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 20 }),
    __metadata("design:type", String)
], Company.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)('double', { default: 0 }),
    __metadata("design:type", Number)
], Company.prototype, "laltitude", void 0);
__decorate([
    (0, typeorm_1.Column)('double', { default: 0 }),
    __metadata("design:type", Number)
], Company.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)('bool', { default: true }),
    __metadata("design:type", Boolean)
], Company.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)('bool', { default: true }),
    __metadata("design:type", Boolean)
], Company.prototype, "canPublish", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Company.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Company.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => document_1.FileDocument, {
        cascade: true,
        nullable: true,
        onUpdate: 'NO ACTION',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", document_1.FileDocument)
], Company.prototype, "profile", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => restaurant_1.Restaurant, (restaurant) => restaurant.company, {
        cascade: true,
        nullable: true,
        onDelete: 'SET NULL',
    }),
    __metadata("design:type", Array)
], Company.prototype, "restaurants", void 0);
Company = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Index)(['short_name', 'name'], { unique: true }),
    (0, typeorm_1.Index)(['name', 'country'], { unique: true })
], Company);
exports.Company = Company;
//# sourceMappingURL=company.js.map