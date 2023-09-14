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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const swagger_1 = require("@nestjs/swagger");
const user_dto_1 = require("../../dto/user.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    onModuleInit() {
        this.createAdmin();
    }
    async createAdmin() {
        const { SUPER_ADMIN_EMAIL, SUPER_ADMIN_PHONE, SUPER_ADMIN_PASSWORD, SUPER_ADMIN_FIRSTNAME, SUPER_ADMIN_LASTNAME, } = process.env;
        console.log(`-------------------------${SUPER_ADMIN_EMAIL}---------------------${process.env.SUPER_ADMIN_EMAIL}`);
        const admin = new user_dto_1.UserDto();
        admin.firstname = SUPER_ADMIN_FIRSTNAME;
        admin.lastname = SUPER_ADMIN_LASTNAME;
        admin.email = SUPER_ADMIN_EMAIL;
        admin.pin = SUPER_ADMIN_PASSWORD;
        admin.isAdmin = true;
        admin.isAgent = false;
        admin.phone = SUPER_ADMIN_PHONE;
        admin.roleId = 1;
        try {
        }
        catch (error) {
            console.log(error);
        }
    }
    create(user) {
        console.log('---------------------create user--------------------', user);
        return this.userService.create(user);
    }
    getAllUser() {
        return this.userService.getAllUser();
    }
    getUserById(id) {
        return this.userService.getUserById(id);
    }
    updateUserById(id, user) {
        user.id = id;
        return this.userService.updateUserById(user);
    }
};
__decorate([
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getAllUser", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_dto_1.UserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateUserById", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)('user'),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map