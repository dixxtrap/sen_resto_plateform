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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlateService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("../../typeorm");
const typeorm_3 = require("typeorm");
let PlateService = class PlateService {
    constructor(repos, plateFileRepos, tagPlateRepos, docRepos) {
        this.repos = repos;
        this.plateFileRepos = plateFileRepos;
        this.tagPlateRepos = tagPlateRepos;
        this.docRepos = docRepos;
    }
    getS() {
        return this.repos.find({ relations: { file: { photo: true } } });
    }
    async get(id) {
        return await this.repos.findOne({
            where: { id },
            relations: { file: { photo: true }, tag: true },
        });
    }
    async getByRestaurant(id) {
        return await this.repos.find({
            where: { restaurantId: id },
            relations: { file: { photo: true }, tag: true },
        });
    }
    async create(data) {
        try {
            return this.repos.save(this.repos.create(data));
        }
        catch (error) {
            throw new common_1.HttpException(Object.assign({}, error), 500);
        }
    }
    async update(data) {
        const old = await this.repos.findOne({ where: { id: data.id } });
        await this.tagPlateRepos.delete({ plateId: data.id });
        const { tag, id } = data, plate = __rest(data, ["tag", "id"]);
        await tag.forEach(async (ele) => {
            await this.tagPlateRepos.save(this.tagPlateRepos.create({ tagId: ele.id, plateId: data.id }));
        });
        if (!old)
            throw new common_1.NotFoundException(`${data.name} not Found`);
        await this.repos.update({ id: data.id }, Object.assign({}, plate));
        return Object.assign(Object.assign({}, old), { data });
    }
    async addPhoto(id, file) {
        const img = await this.docRepos.save(this.docRepos.create(Object.assign({}, file)));
        const plateFile = await this.plateFileRepos.save(this.plateFileRepos.create({ photoId: img.id, plateId: id }));
        return plateFile;
    }
};
PlateService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(typeorm_2.Plate)),
    __param(1, (0, typeorm_1.InjectRepository)(typeorm_2.PlateFile)),
    __param(2, (0, typeorm_1.InjectRepository)(typeorm_2.TagPlate)),
    __param(3, (0, typeorm_1.InjectRepository)(typeorm_2.FileDocument)),
    __metadata("design:paramtypes", [typeorm_3.Repository,
        typeorm_3.Repository,
        typeorm_3.Repository,
        typeorm_3.Repository])
], PlateService);
exports.PlateService = PlateService;
//# sourceMappingURL=plate.service.js.map