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
exports.TagService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const tag_data_1 = require("../../data/tag_data");
const typeorm_2 = require("../../typeorm");
const typeorm_3 = require("typeorm");
let TagService = class TagService {
    constructor(repos) {
        this.repos = repos;
    }
    onModuleInit() {
        this.createTags();
    }
    async createTags() {
        Promise.all(tag_data_1.tagData.map(async (e) => {
            const old = await this.repos.findOne({ where: { name: e.name } });
            if (!old)
                await this.repos.save(this.repos.create(e));
        }));
    }
    getS() {
        return this.repos.find({});
    }
    async get(id) {
        return await this.repos.findOne({
            where: { id },
        });
    }
    async create(item) {
        var _a;
        try {
            return await this.repos.save(this.repos.create(item));
        }
        catch (error) {
            throw new common_1.HttpException(Object.assign({}, error), (_a = error.code) !== null && _a !== void 0 ? _a : 500);
        }
    }
    async update(item) {
        var _a;
        try {
            const oldCompUser = await this.repos.findOneBy({ id: item.id });
            if (!oldCompUser)
                throw new common_1.NotFoundException();
            await this.repos.update({ id: item.id }, Object.assign({}, item));
            return Object.assign(Object.assign({}, oldCompUser), item);
        }
        catch (error) {
            throw new common_1.HttpException(Object.assign({}, error), (_a = error.code) !== null && _a !== void 0 ? _a : 500);
        }
    }
};
TagService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(typeorm_2.Tag)),
    __metadata("design:paramtypes", [typeorm_3.Repository])
], TagService);
exports.TagService = TagService;
//# sourceMappingURL=tag.service.js.map