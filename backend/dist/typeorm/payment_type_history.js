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
exports.PaymentTypeHistory = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
let PaymentTypeHistory = class PaymentTypeHistory {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PaymentTypeHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 30 }),
    __metadata("design:type", String)
], PaymentTypeHistory.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.User, {
        cascade: true,
        nullable: true,
        onUpdate: 'NO ACTION',
    }),
    __metadata("design:type", _1.User)
], PaymentTypeHistory.prototype, "createBy", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PaymentTypeHistory.prototype, "createById", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => _1.PaymentType, {
        cascade: true,
        nullable: true,
        onUpdate: 'NO ACTION',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", _1.PaymentType)
], PaymentTypeHistory.prototype, "paymentType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], PaymentTypeHistory.prototype, "paymentTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)('double', { default: 0 }),
    __metadata("design:type", Number)
], PaymentTypeHistory.prototype, "fees", void 0);
__decorate([
    (0, typeorm_1.Column)('double', { default: 0 }),
    __metadata("design:type", Number)
], PaymentTypeHistory.prototype, "feesInvert", void 0);
__decorate([
    (0, typeorm_1.Column)('bool', { default: false }),
    __metadata("design:type", Boolean)
], PaymentTypeHistory.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 250, nullable: true }),
    __metadata("design:type", String)
], PaymentTypeHistory.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PaymentTypeHistory.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], PaymentTypeHistory.prototype, "updatedAt", void 0);
PaymentTypeHistory = __decorate([
    (0, typeorm_1.Entity)()
], PaymentTypeHistory);
exports.PaymentTypeHistory = PaymentTypeHistory;
//# sourceMappingURL=payment_type_history.js.map