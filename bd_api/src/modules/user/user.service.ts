import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/user';
import { Repository } from 'typeorm';
import { SignInDto, UserDto } from '../../dto/user.dto';
import { CryptoService } from 'src/utils/crypto_service';
import { JwtService } from '@nestjs/jwt';
import { CompanyUser, RestaurantUser } from 'src/typeorm';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private userRepos: Repository<User>,
    @InjectRepository(CompanyUser)
    private compUserRespo: Repository<CompanyUser>,
    @InjectRepository(RestaurantUser)
    private restoUserRespo: Repository<RestaurantUser>,
    private jwt: JwtService,
  ) {}
  onModuleInit() {
    // this.onInit();
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
  async create(user: UserDto) {
    console.log('------------------create User Service--------------------');
    console.log(user);
    user.profile = { size: 0 };
    user.profile.filename = 'nofile';
    user.profile.size = 0;
    const newUser = await this.userRepos.save(this.userRepos.create(user));
    if (user.companyId && user.companyId != 0) {
      await this.compUserRespo.save(
        this.compUserRespo.create({
          companyId: user.companyId,
          userId: newUser.id,
        }),
      );
    }
    if (user.restaurantId && user.restaurantId != 0) {
      await this.restoUserRespo.save(
        this.restoUserRespo.create({
          restaurantId: user.restaurantId,
          userId: newUser.id,
        }),
      );
    }
    return newUser;
  }
  async signIn(credential: SignInDto) {
    const user = await this.userRepos.findOneBy({ email: credential.email });

    const hash = CryptoService.createHash(credential.password);
    if (!user) throw new NotFoundException('user not found');
    if (user.pin === hash) {
      return this.jwt.sign({ ...user }, { secret: process.env.API_KEY });
    }
    return 'no';
  }
  async getAllUser() {
    return await this.userRepos.find({
      relations: { profile: true },
    });
  }
  async getUserById(id: number) {
    return await this.userRepos.findOne({
      where: { id },
      relations: { profile: true, role: true },
    });
  }
  async updateUserById(user: UserDto) {
    console.log('------------------resolver update-----------------');
    const resp = await this.userRepos.update(
      {
        id: user.id,
      },
      { ...user },
    );
    if (resp.affected > 0) return { message: 'user Updated', code: 200 };
    throw new NotFoundException('user not found');
  }
}
