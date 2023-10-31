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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("../../typeorm");
const order_1 = require("../../typeorm/order");
const typeorm_3 = require("typeorm");
let OrderService = class OrderService {
    constructor(repos, reposOrderPlate, reposPlateHistory) {
        this.repos = repos;
        this.reposOrderPlate = reposOrderPlate;
        this.reposPlateHistory = reposPlateHistory;
    }
    async getS() {
        console.log('---------------------------get order----------------------');
        return await this.repos.find({});
    }
    getById(id) {
        return this.repos.findOne({ where: { id } });
    }
    create(body) {
        return this.repos.save(this.repos.create(body));
    }
    async getOrCreateOrder(customerId, restaurantId) {
        var _a;
        const order = (_a = (await this.repos.findOne({
            where: { customerId, restaurantId, status: order_1.OrderStatus.OnBag },
        }))) !== null && _a !== void 0 ? _a : (await this.repos.save(this.repos.create({ customerId, restaurantId: restaurantId })));
        return order;
    }
    async addPlate(body) {
        const plateHistory = await this.reposPlateHistory.findOne({
            where: { plateId: body.plateId },
            relations: { plate: true },
        });
        const order = await this.getOrCreateOrder(body.customerId, plateHistory.plate.restaurantId);
        const orderPlate = await this.reposOrderPlate.findOne({
            where: { orderId: order.id, plateHistoryId: plateHistory.id },
        });
        if (!orderPlate) {
            const newOrderPlate = await this.reposOrderPlate.save(this.reposOrderPlate.create({
                orderId: order.id,
                plateHistoryId: plateHistory.id,
                quantity: body.quantity,
            }));
            return newOrderPlate;
        }
        else {
            orderPlate.quantity = orderPlate.quantity + body.quantity;
            return await this.reposOrderPlate.save(orderPlate);
        }
    }
    getOrderByUser(decoded) {
        console.log(decoded);
        return this.repos.find({
            where: { customerId: (0, typeorm_3.Equal)(decoded.id) },
            relations: { plates: { plate: true } },
        });
    }
};
OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(typeorm_2.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(typeorm_2.OrderPlate)),
    __param(2, (0, typeorm_1.InjectRepository)(typeorm_2.PlateHistory)),
    __metadata("design:paramtypes", [typeorm_3.Repository,
        typeorm_3.Repository,
        typeorm_3.Repository])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map