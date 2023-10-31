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
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("../../typeorm");
const typeorm_3 = require("typeorm");
let CustomerService = class CustomerService {
    constructor(repos, jwt) {
        this.repos = repos;
        this.jwt = jwt;
    }
    async getS() {
        return await this.repos.find({});
    }
    async get(id) {
        return await this.repos.findOneBy({ id });
    }
    async getPhone(phone) {
        const user = await this.repos.findOneBy({ phone });
        return Object.assign(Object.assign({}, user), { token: this.jwt.sign(Object.assign({}, user), { secret: process.env.API_KEY }) });
    }
    async update(id, item) {
        return await this.repos.update({ id }, Object.assign({}, item));
    }
    async post(item) {
        console.log('---------------------create customer--------------------');
        const customer = await this.repos.findOneBy({ phone: item.phone });
        if (customer)
            return customer;
        return await this.repos.save(this.repos.create(Object.assign({}, item)));
    }
};
CustomerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(typeorm_2.Customer)),
    __metadata("design:paramtypes", [typeorm_3.Repository,
        jwt_1.JwtService])
], CustomerService);
exports.CustomerService = CustomerService;
//# sourceMappingURL=service.js.map