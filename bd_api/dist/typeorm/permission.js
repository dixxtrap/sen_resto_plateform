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
exports.Permission = void 0;
const typeorm_1 = require("typeorm");
const _1 = require("./");
const permission_role_1 = require("./permission_role");
let Permission = class Permission {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Permission.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.PermissionUser, (pU) => pU.permission),
    __metadata("design:type", _1.PermissionUser)
], Permission.prototype, "permissionUser", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => permission_role_1.PermissionRole, (pU) => pU.permission),
    __metadata("design:type", permission_role_1.PermissionRole)
], Permission.prototype, "permissionRole", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], Permission.prototype, "sousModule", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', { enum: ['CREATE', 'READ', 'UPDATE', 'DELETE'] }),
    __metadata("design:type", String)
], Permission.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)('bool', { default: true }),
    __metadata("design:type", Boolean)
], Permission.prototype, "isActive", void 0);
Permission = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Index)(['sousModule', 'type'], { unique: true })
], Permission);
exports.Permission = Permission;
//# sourceMappingURL=permission.js.map