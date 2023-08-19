"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlateModule = void 0;
const common_1 = require("@nestjs/common");
const plate_controller_1 = require("./plate.controller");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("../../typeorm");
const plate_service_1 = require("./plate.service");
const multer_1 = require("@nestjs/platform-express/multer");
const multer_2 = require("multer");
let PlateModule = class PlateModule {
};
PlateModule = __decorate([
    (0, common_1.Module)({
        imports: [
            multer_1.MulterModule.register({
                preservePath: false,
                dest: 'upload',
                storage: (0, multer_2.diskStorage)({
                    destination: 'upload',
                }),
            }),
            typeorm_1.TypeOrmModule.forFeature([typeorm_2.Plate, typeorm_2.FileDocument, typeorm_2.PlateFile, typeorm_2.Tag, typeorm_2.TagPlate]),
        ],
        controllers: [plate_controller_1.PlateController],
        providers: [plate_service_1.PlateService],
    })
], PlateModule);
exports.PlateModule = PlateModule;
//# sourceMappingURL=plate.module.js.map