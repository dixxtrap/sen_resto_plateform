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
exports.CompanyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("../../typeorm");
const typeorm_3 = require("typeorm");
const permission_service_1 = require("../permission/permission.service");
const document_file_service_1 = require("../document_file/document_file.service");
let CompanyService = class CompanyService {
    constructor(restosService, company, companycontact, user, permission, doc) {
        this.restosService = restosService;
        this.company = company;
        this.companycontact = companycontact;
        this.user = user;
        this.permission = permission;
        this.doc = doc;
    }
    getHello() {
        return 'Heloo from companyService';
    }
    async createCompany(companyDto) {
        const role = await this.permission.getRoleByName('ADMIN', 'COMPANY');
        const cp = this.company.create(Object.assign(Object.assign({}, companyDto), { profile: { size: 0 } }));
        const company = await this.company.save(cp);
        return company;
    }
    async getCompanys() {
        return await this.company.find({
            relations: { profile: true, restaurants: { profile: true } },
        });
    }
    async getCompany(id) {
        return await this.company.findOne({
            where: { id: id },
            relations: { profile: true, restaurants: { profile: true } },
        });
    }
    async updateCompany(company) {
        console.log(company);
        const result = await this.company.update(company.id, Object.assign({}, company));
        if (result.affected && result.affected > 0) {
            return true;
        }
        return false;
    }
    async createCompanyContact(companyContact) {
        const contactDoc = await this.companycontact.create(companyContact);
        return await this.companycontact.save(contactDoc);
    }
    async updateCompanyContact(id, companyContact) {
        const contactDoc = await this.companycontact.update(id, companyContact);
        return await contactDoc;
    }
    async getRestaurants() {
        return await this.restosService.find({
            where: { isDelecetd: false },
            relations: { company: true, profile: true },
        });
    }
    async getRestaurantParticulier() {
        return await this.restosService.find({
            where: { isDelecetd: false, company: { short_name: 'SR' } },
            relations: { company: true, profile: true },
        });
    }
    async getRestaurant(id) {
        return await this.restosService.findOne({
            where: { isDelecetd: false, id: id },
            relations: { company: true, profile: true },
        });
    }
    async createRestaurant(restos, company) {
        const rst = this.restosService.create(Object.assign(Object.assign({}, restos), { company: company, profile: { size: 0 } }));
        return await this.restosService.save(rst);
    }
    async deleteRestaurant(id) {
        return await this.restosService.update(id, { isDelecetd: true });
    }
    async updateRestaurant(id, restos) {
        const result = await this.restosService.findOneBy({ id });
        if (result) {
            await this.restosService.update({ id }, Object.assign(Object.assign({}, result), restos));
            return { message: 'Transaction affectuer avec success' };
        }
        throw new typeorm_3.MustBeEntityError('Oups!!! Something went wrong', 'message 2');
    }
};
CompanyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(typeorm_2.Restaurant)),
    __param(1, (0, typeorm_1.InjectRepository)(typeorm_2.Company)),
    __param(2, (0, typeorm_1.InjectRepository)(typeorm_2.CompanyContact)),
    __param(3, (0, typeorm_1.InjectRepository)(typeorm_2.User)),
    __metadata("design:paramtypes", [typeorm_3.Repository,
        typeorm_3.Repository,
        typeorm_3.Repository,
        typeorm_3.Repository,
        permission_service_1.PermissionService,
        document_file_service_1.DocumentService])
], CompanyService);
exports.CompanyService = CompanyService;
//# sourceMappingURL=company.service.js.map