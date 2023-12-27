import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { throws } from 'assert';
import { logInfo } from 'src/app_log';
import { User } from 'src/typeorm';
import { UserDto } from 'src/typeorm/user.entity';
import { CryptoService } from 'src/utils/crypto_service';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { Equal, Repository } from 'typeorm';
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repos: Repository<User>) {}
  async createAdmin(roleId: number) {
    //     SUPER_ADMIN_EMAIL=Kalanji2023@gmail.com
    // SUPER_ADMIN_PASSWORD=kalanji2023
    // SUPER_ADMIN_PHONE=221772371668
    // SUPER_ADMIN_FIRSTNAME=SUPER
    // SUPER_ADMIN_LASTNAME=ADMIN
    // SUPER_ADMIN_PASSWORD=110596
    const exist = await this.repos.exist({
      where: {
        email: process.env.SUPER_ADMIN_EMAIL,
        firstname: process.env.SUPER_ADMIN_FIRSTNAME,
        lastname: process.env.SUPER_ADMIN_LASTNAME,
      },
    });
    if (!exist)
      return this.repos.save(
        this.repos.create({
          email: process.env.SUPER_ADMIN_EMAIL,
          password: process.env.SUPER_ADMIN_PASSWORD,
          firstname: process.env.SUPER_ADMIN_FIRSTNAME,
          lastname: process.env.SUPER_ADMIN_LASTNAME,
          roleId: roleId,
        }),
      );
  }
  create({ by, body }: { by: UserDto; body: UserDto }) {
    logInfo({ by, action: `create user ${body.email}` });
    return this.repos
      .save(this.repos.create(body))
      .then((value) => {
        if (value) return HttpExceptionCode.SUCCEEDED;
        throw new Error('Not created');
      })
      .catch((err) => {
        console.log(err);
        throw new HttpException(HttpExceptionCode.FAILLURE, 400);
      });
  }
  get() {
    return this.repos
      .find({ relations: { role: true } })
      .then((value) => value)
      .catch((err) => {
        console.log(err);
        throw new HttpException(HttpExceptionCode.FAILLURE, 400);
      });
  }
  update({ id, by, body }: { id: number; by: UserDto; body: UserDto }) {
    logInfo({ by, action: `update user idenfier by Id= ${id}` });
    return this.repos
      .update({ id: Equal(id) }, { ...body })
      .then((value) => {
        if (value.affected > 1) return HttpExceptionCode.SUCCEEDED;
      })
      .catch((err) => {
        console.log(err);
        throw new HttpException(HttpExceptionCode.FAILLURE, 400);
      });
  }
  findByEmail({ email }: { email: string }) {
    return this.repos
      .findOneBy({ email: Equal(email) })
      .then((value) => {
        if (value) return value;
        throw new Error(`email not found`);
      })
      .catch((err) => {
        console.log(err);
        throw new HttpException(HttpExceptionCode.FAILLURE, 400);
      });
  }
  findByEmailForLogin({ email }: { email: string }) {
    return this.repos
      .findOne({
        where: { email: Equal(email) },
        // select: { id: true, password: true, firstname: true, lastname: true },
      })
      .then((value) => {
        if (value) return value;
        throw new Error(`email not found`);
      })
      .catch((err) => {
        console.log(err);
        throw new HttpException(HttpExceptionCode.FAILLURE, 400);
      });
  }
  definePassword({ id, password }: { id: number; password: string }) {
    return this.repos.update(
      { id },
      {
        password: CryptoService.createHash(password),
        passwordCrypt: CryptoService.encrypt(password),
      },
    );
  }
  getProfile(by: UserDto) {
    console.log(by);
    return this.repos
      .findOne({
        where: { id: Equal(by.id) },
        relations: {
          parent: true,
          role: { rolePermission: { permission: { module: true } } },
        },
      })
      .then((value) => value)
      .catch((err) => {
        console.log(err);
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }
}
