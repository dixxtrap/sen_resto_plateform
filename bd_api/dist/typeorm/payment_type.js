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
exports.PaymentType = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
let PaymentType = class PaymentType {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PaymentType.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 30 }),
    __metadata("design:type", String)
], PaymentType.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.User, {
        cascade: true,
        nullable: true,
        onUpdate: 'NO ACTION',
    }),
    __metadata("design:type", _1.User)
], PaymentType.prototype, "createBy", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PaymentType.prototype, "createById", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => _1.FileDocument, {
        cascade: true,
        nullable: true,
        onUpdate: 'NO ACTION',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", _1.FileDocument)
], PaymentType.prototype, "profile", void 0);
__decorate([
    (0, typeorm_1.Column)('double', { default: 0 }),
    __metadata("design:type", Number)
], PaymentType.prototype, "fees", void 0);
__decorate([
    (0, typeorm_1.Column)('double', { default: 0 }),
    __metadata("design:type", Number)
], PaymentType.prototype, "feesInvert", void 0);
__decorate([
    (0, typeorm_1.Column)('bool', { default: false }),
    __metadata("design:type", Boolean)
], PaymentType.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 250 }),
    __metadata("design:type", String)
], PaymentType.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PaymentType.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], PaymentType.prototype, "updatedAt", void 0);
PaymentType = __decorate([
    (0, typeorm_1.Entity)()
], PaymentType);
exports.PaymentType = PaymentType;
//# sourceMappingURL=payment_type.js.map