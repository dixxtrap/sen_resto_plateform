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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const crypto_service_1 = require("../utils/crypto_service");
const _1 = require(".");
const _2 = require(".");
let User = class User {
    async hashPassword() {
        this.restaurantId = this.restaurantId == 0 ? null : this.restaurantId;
        this.companyId = this.companyId == 0 ? null : this.companyId;
        this.pin = await crypto_service_1.CryptoService.createHash(this.pin);
        this.encryptedPin = await crypto_service_1.CryptoService.encrypt(this.pin);
    }
    async PermissionLenght() {
        this.permissionLenght = this.permission.length;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int' }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], User.prototype, "firstname", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], User.prototype, "lastname", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], User.prototype, "pin", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], User.prototype, "encryptedPin", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isAdmin", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isAgent", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.Restaurant),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", _1.Restaurant)
], User.prototype, "restaurant", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", Number)
], User.prototype, "restaurantId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.Company),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", _1.Company)
], User.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", Number)
], User.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => _1.Permission, {
        cascade: true,
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
        eager: true,
    }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], User.prototype, "permission", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 40, default: '' }),
    __metadata("design:type", String)
], User.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, default: 'SN' }),
    __metadata("design:type", String)
], User.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, default: 'Dakar' }),
    __metadata("design:type", String)
], User.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "birthday", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 30 }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)('bigint', { nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "roleId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.Role, (role) => role.user),
    __metadata("design:type", _1.Role)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => _2.FileDocument, {
        cascade: true,
        nullable: true,
        onUpdate: 'NO ACTION',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", _2.FileDocument)
], User.prototype, "profile", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "hashPassword", null);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "PermissionLenght", null);
User = __decorate([
    (0, typeorm_1.Entity)('user'),
    (0, typeorm_1.Index)(['email', 'phone'], { unique: true })
], User);
exports.User = User;
//# sourceMappingURL=user.js.map