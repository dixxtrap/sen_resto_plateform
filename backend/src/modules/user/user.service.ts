import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/user';
import { Repository } from 'typeorm';
import { SignInDto, UserDto } from '../../dto/user.dto';
import { CryptoService } from 'src/utils/crypto_service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
  [x: string]: any;
  constructor(
    @InjectRepository(User)
    private userRepos: Repository<User>,

    private jwt: JwtService,
  ) {}

  async create(user: UserDto) {
    console.log('------------------create User Service--------------------');
    console.log(user);
    user.profile = { size: 0 };
    user.profile.filename = 'nofile';
    user.profile.size = 0;
    const newUser = await this.userRepos.save(this.userRepos.create(user));
    return newUser;
  }
  async signIn(credential: SignInDto) {
    console.log('---------------------------credential-----------------------');
    console.log(credential);
    const user = await this.userRepos.findOneBy({ email: credential.email });
    user.pin = CryptoService.createHash(credential.password);
    // await this.userRepos.save(user);
    console.log(user);
    const hash = CryptoService.createHash(credential.password);
    if (!user) throw new NotFoundException('user not found');
    if (user.pin === hash) {
      return this.jwt.sign({ ...user }, { secret: process.env.API_KEY });
    }
    return undefined;
  }
  async getAllUser() {
    return await this.userRepos.find({
      relations: {
        profile: true,
        role: true,
      },
    });
  }
  async profile(id: number) {
    return await this.userRepos.findOne({
      where: { id },
      relations: {
        role: {
          permission: true,
        },
      },
      // select: {
      //   hashPassword: false,
      // },
    });
  }
  async getUserById(id: number) {
    return await this.userRepos.findOne({
      where: { id },
      relations: {
        profile: true,
        role: true,
        company: { profile: true },
        restaurant: { profile: true },
      },
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
