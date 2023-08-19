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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_1 = require("../../typeorm/user");
const typeorm_2 = require("typeorm");
const crypto_service_1 = require("../../utils/crypto_service");
const jwt_1 = require("@nestjs/jwt");
const typeorm_3 = require("../../typeorm");
let UserService = class UserService {
    constructor(userRepos, compUserRespo, restoUserRespo, jwt) {
        this.userRepos = userRepos;
        this.compUserRespo = compUserRespo;
        this.restoUserRespo = restoUserRespo;
        this.jwt = jwt;
    }
    onModuleInit() {
    }
    async onInit() {
        const admin = await this.userRepos.create({
            email: 'admin2023@gmail.com',
            birthday: new Date('11/05/1996'),
            city: 'pikine',
            country: 'senegal',
            firstname: 'Super',
            lastname: 'Administrateur',
            isAdmin: true,
            pin: '000000',
            roleId: 17,
        });
        return this.userRepos.save(admin);
    }
    async create(user) {
        console.log('------------------create User Service--------------------');
        console.log(user);
        user.profile = { size: 0 };
        user.profile.filename = 'nofile';
        user.profile.size = 0;
        const newUser = await this.userRepos.save(this.userRepos.create(user));
        if (user.companyId && user.companyId != 0) {
            await this.compUserRespo.save(this.compUserRespo.create({
                companyId: user.companyId,
                userId: newUser.id,
            }));
        }
        if (user.restaurantId && user.restaurantId != 0) {
            await this.restoUserRespo.save(this.restoUserRespo.create({
                restaurantId: user.restaurantId,
                userId: newUser.id,
            }));
        }
        return newUser;
    }
    async signIn(credential) {
        const user = await this.userRepos.findOneBy({ email: credential.email });
        const hash = crypto_service_1.CryptoService.createHash(credential.password);
        if (!user)
            throw new common_1.NotFoundException('user not found');
        if (user.pin === hash) {
            return this.jwt.sign(Object.assign({}, user), { secret: process.env.API_KEY });
        }
        return 'no';
    }
    async getAllUser() {
        return await this.userRepos.find({
            relations: { profile: true },
        });
    }
    async getUserById(id) {
        return await this.userRepos.findOne({
            where: { id },
            relations: { profile: true, role: true },
        });
    }
    async updateUserById(user) {
        console.log('------------------resolver update-----------------');
        const resp = await this.userRepos.update({
            id: user.id,
        }, Object.assign({}, user));
        if (resp.affected > 0)
            return { message: 'user Updated', code: 200 };
        throw new common_1.NotFoundException('user not found');
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(typeorm_3.CompanyUser)),
    __param(2, (0, typeorm_1.InjectRepository)(typeorm_3.RestaurantUser)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map