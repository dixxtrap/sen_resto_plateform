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
exports.CompanyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const company_service_1 = require("./company.service");
const company_dto_1 = require("../../dto/company.dto");
const contact_dto_1 = require("../../dto/contact.dto");
const restaurant_dto_1 = require("../../dto/restaurant.dto");
let CompanyController = class CompanyController {
    constructor(companyService) {
        this.companyService = companyService;
    }
    async createCompany(company) {
        return this.companyService.createCompany(company);
    }
    async addRestaurant(resto) {
        return this.companyService.createRestaurant(resto);
    }
    getCompanys() {
        return this.companyService.getCompanys();
    }
    createContact(id, contact) {
        contact.companyId = id;
        return this.companyService.createCompanyContact(contact);
    }
    createCompanyWithReasto(company) {
        return this.companyService.createCompany(company);
    }
    async getCompany(id) {
        return this.companyService.getCompany(id);
    }
    async updateCompany(id, company) {
        company.id = id;
        console.log(company.id);
        return await this.companyService.updateCompany(company);
    }
    updateContact(id, contact) {
        contact.companyId = id;
        return this.companyService.updateCompanyContact(id, contact);
    }
    deleteRestaurant(id) {
        return this.companyService.deleteRestaurant(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [company_dto_1.CompanyDto]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "createCompany", null);
__decorate([
    (0, common_1.Post)('/add_restaurant'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [restaurant_dto_1.RestaurantDto]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "addRestaurant", null);
__decorate([
    (0, common_1.Get)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CompanyController.prototype, "getCompanys", null);
__decorate([
    (0, common_1.Post)('contact/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, contact_dto_1.CompanyContactDto]),
    __metadata("design:returntype", void 0)
], CompanyController.prototype, "createContact", null);
__decorate([
    (0, common_1.Post)('create_with_restos'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [company_dto_1.CompanyDto]),
    __metadata("design:returntype", void 0)
], CompanyController.prototype, "createCompanyWithReasto", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "getCompany", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, company_dto_1.CompanyDto]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "updateCompany", null);
__decorate([
    (0, common_1.Put)('contact/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, contact_dto_1.CompanyContactDto]),
    __metadata("design:returntype", void 0)
], CompanyController.prototype, "updateContact", null);
__decorate([
    (0, common_1.Delete)('restaurant'),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CompanyController.prototype, "deleteRestaurant", null);
CompanyController = __decorate([
    (0, swagger_1.ApiTags)('Company'),
    (0, common_1.Controller)('company'),
    __metadata("design:paramtypes", [company_service_1.CompanyService])
], CompanyController);
exports.CompanyController = CompanyController;
//# sourceMappingURL=company.controller.js.map