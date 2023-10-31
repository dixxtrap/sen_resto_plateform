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
exports.SecurityService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
let SecurityService = class SecurityService {
    constructor(user) {
        this.user = user;
    }
    async login(body) {
        console.log(body);
        return await this.user.signIn(body);
    }
    async profile(req) {
        console.log('-------------------get profile--------------------------');
        const user = await this.user.getUserById(req['user'].id);
        return user;
    }
};
SecurityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], SecurityService);
exports.SecurityService = SecurityService;
//# sourceMappingURL=security.service.js.map