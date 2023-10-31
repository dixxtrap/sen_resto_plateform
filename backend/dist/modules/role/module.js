"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleModule = void 0;
const common_1 = require("@nestjs/common");
const service_1 = require("./service");
const controller_1 = require("./controller");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("../../typeorm");
let RoleModule = class RoleModule {
};
RoleModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([typeorm_2.Role, typeorm_2.PermissionRole, typeorm_2.Permission])],
        controllers: [controller_1.RoleController],
        providers: [service_1.RoleService],
    })
], RoleModule);
exports.RoleModule = RoleModule;
//# sourceMappingURL=module.js.map