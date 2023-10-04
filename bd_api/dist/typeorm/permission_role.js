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
exports.PermissionRole = void 0;
const typeorm_1 = require("typeorm");
let PermissionRole = class PermissionRole {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], PermissionRole.prototype, "permissionId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], PermissionRole.prototype, "roleId", void 0);
__decorate([
    (0, typeorm_1.Column)('bool', { default: true }),
    __metadata("design:type", Boolean)
], PermissionRole.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PermissionRole.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], PermissionRole.prototype, "updatedAt", void 0);
PermissionRole = __decorate([
    (0, typeorm_1.Entity)('role_permission_permission', { orderBy: { permissionId: 'ASC' } })
], PermissionRole);
exports.PermissionRole = PermissionRole;
//# sourceMappingURL=permission_role.js.map