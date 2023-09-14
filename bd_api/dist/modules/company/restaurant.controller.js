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
exports.RestaurantController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const restaurant_dto_1 = require("../../dto/restaurant.dto");
const company_service_1 = require("./company.service");
const file_dto_1 = require("../../dto/file.dto");
const local_auth_guard_1 = require("../../middleware/local_auth.guard");
let RestaurantController = class RestaurantController {
    constructor(companyService) {
        this.companyService = companyService;
    }
    async createRestaurant(restaurant, req) {
        restaurant.profile = new file_dto_1.FileDocumentDto();
        restaurant.companyId = req['user'].companyId;
        return await this.companyService.createRestaurant(restaurant);
    }
    async getRestaurants() {
        return await this.companyService.getRestaurants();
    }
    async getRestaurantsParticulier() {
        return await this.companyService.getRestaurantParticulier();
    }
    async get(id) {
        return this.companyService.getRestaurant(id);
    }
    async updtaeRestaurant(id, restaurant) {
        return await this.companyService.updateRestaurant(id, restaurant);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [restaurant_dto_1.RestaurantDto, Object]),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "createRestaurant", null);
__decorate([
    (0, common_1.Get)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "getRestaurants", null);
__decorate([
    (0, common_1.Get)('particulier'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "getRestaurantsParticulier", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "get", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, restaurant_dto_1.RestaurantDto]),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "updtaeRestaurant", null);
RestaurantController = __decorate([
    (0, swagger_1.ApiTags)('restaurant'),
    (0, common_1.Controller)('restaurant'),
    __metadata("design:paramtypes", [company_service_1.CompanyService])
], RestaurantController);
exports.RestaurantController = RestaurantController;
//# sourceMappingURL=restaurant.controller.js.map