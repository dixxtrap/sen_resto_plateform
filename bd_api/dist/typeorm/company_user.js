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
exports.CompanyUser = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
let CompanyUser = class CompanyUser {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CompanyUser.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], CompanyUser.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], CompanyUser.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], CompanyUser.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.Company, {
        cascade: false,
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    }),
    __metadata("design:type", _1.Company)
], CompanyUser.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.User, {
        cascade: false,
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    }),
    __metadata("design:type", _1.User)
], CompanyUser.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CompanyUser.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], CompanyUser.prototype, "updatedAt", void 0);
CompanyUser = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Index)(['userId', 'companyId'])
], CompanyUser);
exports.CompanyUser = CompanyUser;
//# sourceMappingURL=company_user.js.map