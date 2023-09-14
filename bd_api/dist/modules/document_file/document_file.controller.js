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
exports.DocumentController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const typeorm_1 = require("@nestjs/typeorm");
const multer_1 = require("multer");
const path_1 = require("path");
const typeorm_2 = require("../../typeorm");
const typeorm_3 = require("typeorm");
const document_file_service_1 = require("./document_file.service");
const fs = require("fs");
const swagger_1 = require("@nestjs/swagger");
let DocumentController = class DocumentController {
    constructor(doc, docService) {
        this.doc = doc;
        this.docService = docService;
    }
    async getFile(res, id) {
        const file = await this.doc.findOneBy({
            id: id,
        });
        console.log('path:=================', file);
        const filePath = (0, path_1.join)(__dirname, '..', '..', '..', file.path);
        return res.sendFile(filePath);
    }
    async updateFile(file, id, _req) {
        const resp = await this.docService.update(Object.assign(Object.assign({}, file), { id: id }));
        const filePath = (0, path_1.join)(__dirname, '..', '..', '..', resp.path);
        if (file.path && filePath)
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                }
                else {
                    console.log('File deleted successfully.');
                }
            });
        return resp;
    }
};
__decorate([
    (0, common_1.Get)('file/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "getFile", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        dest: './upload',
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, cb) => {
                console.log('------------------destination file-------------------');
                console.log(file);
                console.log(file);
                cb(null, './upload/');
            },
            filename: (req, file, callback) => {
                console.log('------------------destination file name-------------------');
                console.log(req.body);
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
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "updateFile", null);
DocumentController = __decorate([
    (0, common_1.Controller)('document'),
    (0, swagger_1.ApiTags)('document_file'),
    __param(0, (0, typeorm_1.InjectRepository)(typeorm_2.FileDocument)),
    __metadata("design:paramtypes", [typeorm_3.Repository,
        document_file_service_1.DocumentService])
], DocumentController);
exports.DocumentController = DocumentController;
//# sourceMappingURL=document_file.controller.js.map