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
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], PermissionUser.prototype, "permissionId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], PermissionUser.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", _1.Permission)
], PermissionUser.prototype, "permission", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", _1.User)
], PermissionUser.prototype, "user", void 0);
PermissionUser = __decorate([
    (0, typeorm_1.Entity)('user_permission_permission')
], PermissionUser);
exports.PermissionUser = PermissionUser;
//# sourceMappingURL=permission_user.js.map