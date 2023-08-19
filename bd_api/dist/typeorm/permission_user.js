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
exports.PermissionUser = void 0;
const typeorm_1 = require("typeorm");
const _1 = require("./");
let PermissionUser = class PermissionUser {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PermissionUser.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.Permission, (p) => p.permissionUser, {
        cascade: true,
        onDelete: 'SET NULL',
    }),
    __metadata("design:type", Array)
], PermissionUser.prototype, "permission", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.User, (u) => u.permissionUser, {
        cascade: true,
        onDelete: 'SET NULL',
    }),
    __metadata("design:type", Array)
], PermissionUser.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.User, { cascade: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'createById' }),
    __metadata("design:type", _1.User)
], PermissionUser.prototype, "createBy", void 0);
__decorate([
    (0, typeorm_1.Column)('bool', { default: 1 }),
    __metadata("design:type", Boolean)
], PermissionUser.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PermissionUser.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], PermissionUser.prototype, "updatedAt", void 0);
PermissionUser = __decorate([
    (0, typeorm_1.Entity)()
], PermissionUser);
exports.PermissionUser = PermissionUser;
//# sourceMappingURL=permission_user.js.map