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
exports.PermissionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const permission_data_1 = require("../../data/permission.data");
const role_data_1 = require("../../data/role.data");
const typeorm_2 = require("../../typeorm");
const typeorm_3 = require("typeorm");
let PermissionService = class PermissionService {
    constructor(permissionRepos, roleRepos, permiRoleRepos, permiUser) {
        this.permissionRepos = permissionRepos;
        this.roleRepos = roleRepos;
        this.permiRoleRepos = permiRoleRepos;
        this.permiUser = permiUser;
    }
    onModuleInit() {
        console.log('-------------create permission --------------', process.env.API_KEY);
    }
    onInit() {
        try {
            permission_data_1.permissions.forEach((permission) => {
                try {
                    this.createPermission(permission);
                }
                catch (error) { }
            });
        }
        catch (error) { }
    }
    async createRole(role) {
        const r = await this.roleRepos.create(role);
        return this.roleRepos.save(r);
    }
    async getRoleByName(name, scope) {
        return await this.roleRepos.findOne({
            where: { name: name, scope: scope },
        });
    }
    async getRole() {
        return await this.roleRepos.find();
    }
    async getRoleUser(search) {
        return await this.roleRepos.find({
            select: {
                user: {
                    pin: false,
                    encryptedPin: false,
                    email: true,
                    city: true,
                    country: true,
                    birthday: true,
                    phone: true,
                    createdAt: true,
                    updatedAt: true,
                },
            },
            where: { name: search.toUpperCase() },
            relations: {
                user: true,
                permissionRole: { permission: true },
            },
        });
    }
    async createRolePermissions(permissionRoles) {
        try {
            await permissionRoles.forEach(async (e) => await this.createRolePermission(e));
            return 'yes';
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException(Object.assign({}, error), 500);
        }
    }
    async createRolePermission(permissionRole) {
        try {
            const oldPR = await this.permiRoleRepos.findOne({
                where: {
                    roleId: permissionRole.roleId,
                    permissionId: permissionRole.permissionId,
                    id: permissionRole.id,
                },
            });
            if (permissionRole.id && oldPR) {
                await this.permiRoleRepos.update({ id: permissionRole.id }, { isActive: permissionRole.isActive });
                return Object.assign(Object.assign({}, oldPR), permissionRole);
            }
            return await this.permiRoleRepos.save(this.permiRoleRepos.create(permissionRole));
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException(Object.assign({}, error), 500);
        }
    }
    async getRolePermission(id) {
        return await this.roleRepos.findOne({
            where: {
                id: id,
            },
            relations: {
                permissionRole: {
                    permission: true,
                },
                user: true,
            },
        });
    }
    onInitRole() {
        role_data_1.roleData.forEach(async (permission) => {
            try {
                await this.createRole(permission);
            }
            catch (error) { }
        });
    }
    async createPermission(permisionTdo) {
        try {
            const permissionDoc = this.permissionRepos.create(permisionTdo);
            const savedPermission = await this.permissionRepos.save(permissionDoc);
            return savedPermission;
        }
        catch (error) {
            console.log(error);
        }
    }
    async getPermissions() {
        const permissions = await this.permissionRepos.find();
        return permissions;
    }
};
PermissionService = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(typeorm_2.Permission)),
    __param(1, (0, typeorm_1.InjectRepository)(typeorm_2.Role)),
    __param(2, (0, typeorm_1.InjectRepository)(typeorm_2.PermissionRole)),
    __param(3, (0, typeorm_1.InjectRepository)(typeorm_2.PermissionUser)),
    __metadata("design:paramtypes", [typeorm_3.Repository,
        typeorm_3.Repository,
        typeorm_3.Repository,
        typeorm_3.Repository])
], PermissionService);
exports.PermissionService = PermissionService;
//# sourceMappingURL=permission.service.js.map