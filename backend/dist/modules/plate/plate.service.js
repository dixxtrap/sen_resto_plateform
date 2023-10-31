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
const exception_code_1 = require("../../data/exception_code");
const typeorm_2 = require("../../typeorm");
const typeorm_3 = require("typeorm");
let PlateService = class PlateService {
    constructor(repos, reposHis, plateFileRepos, tagPlateRepos, docRepos) {
        this.repos = repos;
        this.reposHis = reposHis;
        this.plateFileRepos = plateFileRepos;
        this.tagPlateRepos = tagPlateRepos;
        this.docRepos = docRepos;
    }
    async getS(req) {
        console.log(req);
        console.log('-----------------------------------restaurant-------------------', req.restaurantId);
        if (req.restaurantId)
            return await this.repos.find({
                where: { restaurantId: req.restaurantId },
                relations: { file: { photo: true } },
            });
        return (await this.repos.find({
            relations: {
                file: { photo: true },
                restaurant: { company: { profile: true }, profile: true },
            },
        })).sort(() => Math.random() - 0.5);
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
    async create(data, user) {
        console.log(user);
        if (!user.restaurantId)
            throw new common_1.HttpException(Object.assign(Object.assign({}, exception_code_1.exceptionCode['FAILLURE']), { message: 'Vous n avez le droit ajouter un restaurant' }), 500);
        try {
            const plate = await this.repos.save(this.repos.create(Object.assign(Object.assign({}, data), { restaurantId: user.restaurantId })));
            if (data.tagIds && data.tagIds.length > 0)
                await data.tagIds.forEach(async (ele) => {
                    await this.tagPlateRepos.save(this.tagPlateRepos.create({ tagId: ele, plateId: plate.id }));
                });
            const plateHist = await this.reposHis.save(this.reposHis.create({
                plateId: plate.id,
                price: plate.price,
                reduction: plate.reduction,
            }));
            console.log(plateHist);
            return Object.assign(Object.assign({}, exception_code_1.exceptionCode['SUCCEEDED']), { message: `Le plat ${plate.name} vient d étre creer avec succés pour votre restaurant` });
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException(Object.assign({}, error), 500);
        }
    }
    async update(data) {
        const old = await this.repos.findOne({ where: { id: data.id } });
        const { tagIds, id, tag } = data, plate = __rest(data, ["tagIds", "id", "tag"]);
        console.log(tag);
        if (!old)
            throw new common_1.NotFoundException(`${data.name} not Found`);
        await this.repos.update({ id: data.id }, Object.assign({}, plate));
        if (tagIds.length > 0) {
            await this.tagPlateRepos.delete({ plateId: data.id });
            await Promise.all(tagIds.map(async (ele) => {
                await this.tagPlateRepos.save(this.tagPlateRepos.create({ tagId: ele, plateId: id }));
            }));
        }
        if ((old.price != null && old.price != data.price) ||
            (old.reduction && old.reduction != data.reduction)) {
            await this.reposHis.save(this.reposHis.create({
                plateId: old.id,
                price: data.price,
                reduction: data.reduction,
            }));
        }
        return Object.assign(Object.assign({}, old), { data });
    }
    async addPhoto(id, file) {
        const img = await this.docRepos.save(this.docRepos.create(Object.assign({}, file)));
        const plateFile = await this.plateFileRepos.save(this.plateFileRepos.create({ photoId: img.id, plateId: id }));
        return plateFile;
    }
    async getCurrentPlateHistory(id) {
        return await this.reposHis
            .createQueryBuilder('plate_history')
            .where('plate_history.plateId = :plateId', { id })
            .orderBy('plate_history.createdAt', 'DESC')
            .getOne();
    }
};
PlateService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(typeorm_2.Plate)),
    __param(1, (0, typeorm_1.InjectRepository)(typeorm_2.PlateHistory)),
    __param(2, (0, typeorm_1.InjectRepository)(typeorm_2.PlateFile)),
    __param(3, (0, typeorm_1.InjectRepository)(typeorm_2.TagPlate)),
    __param(4, (0, typeorm_1.InjectRepository)(typeorm_2.FileDocument)),
    __metadata("design:paramtypes", [typeorm_3.Repository,
        typeorm_3.Repository,
        typeorm_3.Repository,
        typeorm_3.Repository,
        typeorm_3.Repository])
], PlateService);
exports.PlateService = PlateService;
//# sourceMappingURL=plate.service.js.map