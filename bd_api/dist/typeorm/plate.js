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
exports.Plate = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
const tag_1 = require("./tag");
let Plate = class Plate {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Plate.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.Restaurant),
    __metadata("design:type", _1.Restaurant)
], Plate.prototype, "resaturant", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Plate.prototype, "restaurantId", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: '35' }),
    __metadata("design:type", String)
], Plate.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.PlateFile, (file) => file.plate),
    __metadata("design:type", _1.PlateFile)
], Plate.prototype, "file", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: '350' }),
    __metadata("design:type", String)
], Plate.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => tag_1.Tag, {
        cascade: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        eager: true,
    }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Plate.prototype, "tag", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Plate.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Plate.prototype, "monday", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Plate.prototype, "tuesday", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Plate.prototype, "wednesday", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Plate.prototype, "thursday", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Plate.prototype, "friday", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Plate.prototype, "saturday", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Plate.prototype, "sunday", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cooking_time' }),
    __metadata("design:type", Number)
], Plate.prototype, "cookingTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Plate.prototype, "reduction", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Plate.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Plate.prototype, "createdAt", void 0);
Plate = __decorate([
    (0, typeorm_1.Entity)()
], Plate);
exports.Plate = Plate;
//# sourceMappingURL=plate.js.map