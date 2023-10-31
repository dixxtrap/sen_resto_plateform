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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleController = void 0;
const common_1 = require("@nestjs/common");
const service_1 = require("./service");
const role_dto_1 = require("../../dto/role.dto");
const swagger_1 = require("@nestjs/swagger");
const permission_dto_1 = require("../../dto/permission.dto");
let RoleController = class RoleController {
    constructor(service) {
        this.service = service;
    }
    gets() {
        return this.service.getS();
    }
    post(body) {
        return this.service.post(body);
    }
    update(id, body) {
        return this.service.update(id, body);
    }
    permission(id) {
        return this.service.get(id);
    }
    permissionUser(id) {
        return this.service.get(id);
    }
    getNoValidPermision(id) {
        return this.service.getNoValidPermision(id);
    }
    addPermission(id, body) {
        return this.service.addPermission(id, body);
    }
    removePermission(id, body) {
        return this.service.deletePermission(id, body);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "gets", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_dto_1.RoleDto]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "post", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, role_dto_1.RoleDto]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('permission/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "permission", null);
__decorate([
    (0, common_1.Get)('permission_user/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "permissionUser", null);
__decorate([
    (0, common_1.Get)('noValidPermission/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "getNoValidPermision", null);
__decorate([
    (0, common_1.Post)('permissions/:id'),
    (0, swagger_1.ApiBody)({ type: () => [permission_dto_1.PermissionDto] }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "addPermission", null);
__decorate([
    (0, common_1.Post)('deletePermissions/:id'),
    (0, swagger_1.ApiBody)({ type: () => [permission_dto_1.PermissionDto] }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "removePermission", null);
RoleController = __decorate([
    (0, swagger_1.ApiTags)('Role'),
    (0, common_1.Controller)('role'),
    __metadata("design:paramtypes", [service_1.RoleService])
], RoleController);
exports.RoleController = RoleController;
//# sourceMappingURL=controller.js.map