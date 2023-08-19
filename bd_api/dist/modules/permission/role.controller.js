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
const permission_service_1 = require("./permission.service");
const role_dto_1 = require("../../dto/role.dto");
const swagger_1 = require("@nestjs/swagger");
let RoleController = class RoleController {
    constructor(permissionService) {
        this.permissionService = permissionService;
    }
    create(roleDto) {
        return this.permissionService.createRole(roleDto);
    }
    createRolePermission(rolePermission) {
        return this.permissionService.createRolePermission(rolePermission);
    }
    async createRolePermissions(permissionRoles) {
        return this.permissionService.createRolePermissions(permissionRoles);
    }
    async getRole() {
        console.log('-----------------------get role----------------------');
        return await this.permissionService.getRole();
    }
    async getRoleUser(search) {
        console.log('-----------------------get role user----------------------');
        return await this.permissionService.getRoleUser(search);
    }
    async getPermission(id) {
        console.log('-----------------------get role  permission----------------------');
        return await this.permissionService.getRolePermission(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_dto_1.RoleDto]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('role_permission'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_dto_1.PermissionRoleDto]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "createRolePermission", null);
__decorate([
    (0, common_1.Post)('role_permissions'),
    (0, swagger_1.ApiBody)({ type: [role_dto_1.PermissionRoleDto] }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "createRolePermissions", null);
__decorate([
    (0, common_1.Get)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "getRole", null);
__decorate([
    (0, common_1.Get)('user'),
    __param(0, (0, common_1.Query)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "getRoleUser", null);
__decorate([
    (0, common_1.Get)('permission/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "getPermission", null);
RoleController = __decorate([
    (0, swagger_1.ApiTags)('role'),
    (0, common_1.Controller)('role'),
    __metadata("design:paramtypes", [permission_service_1.PermissionService])
], RoleController);
exports.RoleController = RoleController;
//# sourceMappingURL=role.controller.js.map