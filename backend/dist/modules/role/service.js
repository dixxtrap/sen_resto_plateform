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
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const exception_code_1 = require("../../data/exception_code");
const typeorm_2 = require("../../typeorm");
const typeorm_3 = require("typeorm");
let RoleService = class RoleService {
    constructor(repos, permission, reposPermission) {
        this.repos = repos;
        this.permission = permission;
        this.reposPermission = reposPermission;
    }
    async post(body) {
        return await this.repos.save(this.repos.create(body));
    }
    async getS() {
        return this.repos.find({ relations: { permission: false } });
    }
    async get(id) {
        const role = await this.repos.findOne({
            where: { id },
            relations: {
                permission: true,
                user: { company: true, restaurant: true },
            },
        });
        const permissions = await this.reposPermission.find({
            where: {
                roleId: role.id,
                permissionId: (0, typeorm_3.In)(role.permission.map((p) => p.id)),
            },
        });
        return Object.assign(Object.assign({}, role), { permission: permissions.map((p) => {
                return Object.assign(Object.assign(Object.assign({}, role.permission.filter((p1) => p1.id === p.permissionId)[0]), p), { id: p.permissionId });
            }) });
    }
    async getRolePermission(id) {
        const role = await this.repos.findOne({
            where: { id },
            relations: { permission: true },
        });
        const permissions = await this.reposPermission.find({
            where: {
                roleId: role.id,
                permissionId: (0, typeorm_3.In)(role.permission.map((p) => p.id)),
            },
        });
        return Object.assign(Object.assign({}, role), { permission: permissions.map((p) => {
                return Object.assign(Object.assign(Object.assign({}, role.permission.filter((p1) => p1.id === p.permissionId)[0]), p), { id: p.permissionId });
            }) });
    }
    async getPermission(id) {
        return (await this.repos.findOne({
            where: { id: id },
            relations: { permission: true, user: true },
        })).permission;
    }
    async getNoValidPermision(id) {
        const perm = await this.getPermission(id);
        return this.permission.find({
            where: {
                id: (0, typeorm_3.Not)((0, typeorm_3.In)(perm.map((e) => e.id))),
            },
        });
    }
    async deletePermission(id, body) {
        await Promise.all(body.map(async (e) => {
            const rolePerm = await this.reposPermission.delete({
                permissionId: e.id,
                roleId: id,
            });
        }));
        return exception_code_1.exceptionCode.SUCCEEDED;
    }
    async addPermission(id, body) {
        await Promise.all(body.map(async (e) => {
            const rolePerm = await this.reposPermission.findOne({
                where: { permissionId: e.id, roleId: id },
            });
            if (!rolePerm)
                return this.reposPermission.save(this.reposPermission.create({ permissionId: e.id, roleId: id }));
            return rolePerm;
        }));
        return exception_code_1.exceptionCode.SUCCEEDED;
    }
    async update(id, body) {
        const newBody = await this.repos.update(id, body);
        if (newBody.affected > 0) {
            return exception_code_1.exceptionCode.SUCCEEDED;
        }
        else {
            throw new common_1.HttpException(exception_code_1.exceptionCode.FAILLURE, 400);
        }
    }
};
RoleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(typeorm_2.Role)),
    __param(1, (0, typeorm_1.InjectRepository)(typeorm_2.Permission)),
    __param(2, (0, typeorm_1.InjectRepository)(typeorm_2.PermissionRole)),
    __metadata("design:paramtypes", [typeorm_3.Repository,
        typeorm_3.Repository,
        typeorm_3.Repository])
], RoleService);
exports.RoleService = RoleService;
//# sourceMappingURL=service.js.map