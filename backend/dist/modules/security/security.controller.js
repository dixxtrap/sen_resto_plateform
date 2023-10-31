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
exports.SecurityController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const security_service_1 = require("./security.service");
const loginDto_1 = require("./dto/loginDto");
const exception_code_1 = require("../../data/exception_code");
const local_auth_guard_1 = require("../../middleware/local_auth.guard");
let SecurityController = class SecurityController {
    constructor(service) {
        this.service = service;
    }
    async login(body, res) {
        const token = await this.service.login(body);
        console.log(token);
        res.cookie('access_token', 'Bearer ' + token, {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            sameSite: 'none',
        });
        return res.status(200).json(exception_code_1.exceptionCode.LOGIN_SUCCESS);
    }
    async profile(req, res) {
        console.log('------------------------get profile--------------------------');
        console.log(req['user']);
        const user = await this.service.profile(req);
        if (!user) {
            res.clearCookie('access_token');
            res.redirect('localhost:3000/');
        }
        return res.json(user);
    }
    async signout(res) {
        console.log(`------------------deconnexion--------------- redirect to ${process.env.BAC_OFFICE_URL}`);
        res.clearCookie('access_token', { sameSite: 'none' });
        return res.status(200).json(exception_code_1.exceptionCode.LOGOUT_SUCCESS);
    }
};
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [loginDto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], SecurityController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('/profile'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SecurityController.prototype, "profile", null);
__decorate([
    (0, common_1.Get)('/signout'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SecurityController.prototype, "signout", null);
SecurityController = __decorate([
    (0, common_1.Controller)('security'),
    (0, swagger_1.ApiTags)('Security'),
    __metadata("design:paramtypes", [security_service_1.SecurityService])
], SecurityController);
exports.SecurityController = SecurityController;
//# sourceMappingURL=security.controller.js.map