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
const exception_code_1 = require("../../data/exception_code");
const permission_data_1 = require("../../data/permission.data");
const role_data_1 = require("../../data/role.data");
const typeorm_2 = require("../../typeorm");
const typeorm_3 = require("typeorm");
let PermissionService = class PermissionService {
    constructor(permissionRepos, roleRepos) {
        this.permissionRepos = permissionRepos;
        this.roleRepos = roleRepos;
    }
    onModuleInit() {
        console.log('-------------create permission --------------', process.env.API_KEY);
        try {
        }
        catch (e) { }
    }
    async onInit() {
        try {
            await Promise.all(permission_data_1.permissions.map(async (permission) => {
                try {
                    await this.createPermission(permission);
                }
                catch (error) { }
            }));
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
                permission: true,
            },
        });
    }
    async getRolePermission(id) {
        return await this.roleRepos.findOne({
            where: {
                id: id,
            },
            relations: {
                permission: true,
                user: true,
            },
        });
    }
    async onInitRole() {
        Promise.all(await role_data_1.roleData.map(async (permission) => {
            try {
                await this.createRole(permission);
            }
            catch (error) { }
        }));
    }
    async createPermission(permisionTdo) {
        Promise.all(['CREATE', 'READ', 'UPDATE', 'DELETE'].map((e) => {
            this.permissionRepos.save(this.permissionRepos.create(Object.assign(Object.assign({}, permisionTdo), { type: e })));
        }))
            .then((_e) => exception_code_1.exceptionCode.SUCCEEDED)
            .catch((_e) => new common_1.HttpException(exception_code_1.exceptionCode.FAILLURE, 404));
    }
    async getPermissions() {
        const permissions = await this.permissionRepos.find({});
        return permissions;
    }
};
PermissionService = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(typeorm_2.Permission)),
    __param(1, (0, typeorm_1.InjectRepository)(typeorm_2.Role)),
    __metadata("design:paramtypes", [typeorm_3.Repository,
        typeorm_3.Repository])
], PermissionService);
exports.PermissionService = PermissionService;
//# sourceMappingURL=permission.service.js.map