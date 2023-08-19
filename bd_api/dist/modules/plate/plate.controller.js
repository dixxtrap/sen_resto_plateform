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
exports.PlateController = void 0;
const common_1 = require("@nestjs/common");
const plate_service_1 = require("./plate.service");
const plate_dto_1 = require("../../dto/plate.dto");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
let PlateController = class PlateController {
    constructor(service) {
        this.service = service;
    }
    getS() {
        return this.service.getS();
    }
    get(id) {
        return this.service.get(id);
    }
    getByRestaurant(id) {
        return this.service.getByRestaurant(id);
    }
    create(item) {
        return this.service.create(item);
    }
    update(id, item) {
        item.id = id;
        console.log(item);
        return this.service.update(item);
    }
    addPhoto(file, id) {
        console.log(file);
        return this.service.addPhoto(id, file);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({ type: [plate_dto_1.GetPalteDto], status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlateController.prototype, "getS", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PlateController.prototype, "get", null);
__decorate([
    (0, common_1.Get)('restaurant/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PlateController.prototype, "getByRestaurant", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [plate_dto_1.PlateDto]),
    __metadata("design:returntype", void 0)
], PlateController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, plate_dto_1.PlateDto]),
    __metadata("design:returntype", void 0)
], PlateController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('/:id/photo'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        dest: './upload',
        storage: (0, multer_1.diskStorage)({
            destination: './upload',
            filename: (req, file, callback) => {
                const randomName = Array(32)
                    .fill(null)
                    .map(() => Math.round(Math.random() * 16).toString(16))
                    .join('');
                return callback(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PlateController.prototype, "addPhoto", null);
PlateController = __decorate([
    (0, swagger_1.ApiTags)('plate'),
    (0, common_1.Controller)('plate'),
    __metadata("design:paramtypes", [plate_service_1.PlateService])
], PlateController);
exports.PlateController = PlateController;
//# sourceMappingURL=plate.controller.js.map