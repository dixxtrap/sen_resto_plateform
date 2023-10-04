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
exports.Role = void 0;
const typeorm_1 = require("typeorm");
const _1 = require("./");
const uppercase_transformer_1 = require("../transformer/uppercase.transformer");
let Role = class Role {
    async PermissionLenght() {
        var _a, _b;
        console.log(this);
        this.permissionLenght = this.permission.length;
        this.userLenght = (_b = (_a = this.user) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment', { type: 'int' }),
    __metadata("design:type", Number)
], Role.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', {
        transformer: new uppercase_transformer_1.UppercaseTransformer(),
        enum: ['SUPER', 'RESTAURANT', 'COMPANY', 'DELIVER', 'CUSTOMER'],
    }),
    __metadata("design:type", String)
], Role.prototype, "scope", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: true }),
    __metadata("design:type", Boolean)
], Role.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 30 }),
    __metadata("design:type", String)
], Role.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.User, (u) => u.role),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Role.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => _1.Permission, {
        cascade: true,
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
        eager: true,
    }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Role.prototype, "permission", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Role.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Role.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Role.prototype, "PermissionLenght", null);
Role = __decorate([
    (0, typeorm_1.Entity)('role'),
    (0, typeorm_1.Index)(['scope', 'name'], { unique: true })
], Role);
exports.Role = Role;
//# sourceMappingURL=role.js.map