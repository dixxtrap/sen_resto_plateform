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
exports.CompanyContact = void 0;
const typeorm_1 = require("typeorm");
const _1 = require("./");
const contact_1 = require("./contact");
let CompanyContact = class CompanyContact extends contact_1.Contact {
};
__decorate([
    (0, typeorm_1.Column)('int', { nullable: true }),
    __metadata("design:type", Number)
], CompanyContact.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.Company),
    __metadata("design:type", _1.Company)
], CompanyContact.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CompanyContact.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], CompanyContact.prototype, "updatedAt", void 0);
CompanyContact = __decorate([
    (0, typeorm_1.Entity)()
], CompanyContact);
exports.CompanyContact = CompanyContact;
//# sourceMappingURL=company_contact.js.map