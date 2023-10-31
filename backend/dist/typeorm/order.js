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
exports.Order = exports.OrderStatus = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["Empty"] = "empty";
    OrderStatus["OnBag"] = "onbag";
    OrderStatus["Active"] = "active";
    OrderStatus["Preparing"] = "preparing";
    OrderStatus["ReadyForDelivery"] = "ready_for_delivery";
    OrderStatus["OutForDelivery"] = "out_for_delivery";
    OrderStatus["Delivered"] = "delivered";
    OrderStatus["DeliveryDelayed"] = "delivery_delayed";
    OrderStatus["Cancelled"] = "cancelled";
    OrderStatus["QualityIssue"] = "quality_issue";
    OrderStatus["PaymentProcessing"] = "payment_processing";
    OrderStatus["RefundInProgress"] = "refund_in_progress";
    OrderStatus["OrderNotDelivered"] = "order_not_delivered";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));
let Order = class Order {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Order.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => _1.Customer, {
        cascade: true,
        nullable: true,
        onUpdate: 'NO ACTION',
    }),
    __metadata("design:type", _1.Customer)
], Order.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", Number)
], Order.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => _1.Restaurant, {
        cascade: true,
        nullable: true,
        onUpdate: 'NO ACTION',
    }),
    __metadata("design:type", _1.Restaurant)
], Order.prototype, "restaurant", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", Number)
], Order.prototype, "restaurantId", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', { nullable: true }),
    __metadata("design:type", Date)
], Order.prototype, "deliveryDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.Empty,
    }),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => _1.Plate, {
        cascade: true,
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
    }),
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", Number)
], Order.prototype, "paymentTypeHistoryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.PaymentTypeHistory),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", _1.PaymentTypeHistory)
], Order.prototype, "paymentTypeHistory", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => _1.PlateHistory, {
        cascade: true,
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
    }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Order.prototype, "plates", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'float' }),
    __metadata("design:type", Number)
], Order.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Order.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Order.prototype, "updatedAt", void 0);
Order = __decorate([
    (0, typeorm_1.Entity)()
], Order);
exports.Order = Order;
//# sourceMappingURL=order.js.map