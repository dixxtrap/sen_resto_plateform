"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentModule = void 0;
const common_1 = require("@nestjs/common");
const document_file_controller_1 = require("./document_file.controller");
const document_file_service_1 = require("./document_file.service");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("../../typeorm");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
let DocumentModule = class DocumentModule {
};
DocumentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([typeorm_2.FileDocument]),
            platform_express_1.MulterModule.register({
                preservePath: false,
                dest: 'upload',
                storage: (0, multer_1.diskStorage)({
                    destination: 'upload',
                }),
            }),
        ],
        controllers: [document_file_controller_1.DocumentController],
        providers: [document_file_service_1.DocumentService],
        exports: [document_file_service_1.DocumentService],
    })
], DocumentModule);
exports.DocumentModule = DocumentModule;
//# sourceMappingURL=document_file.module.js.map