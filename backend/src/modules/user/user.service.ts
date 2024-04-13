import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { logInfo } from 'src/app_log';
import { User } from 'src/typeorm';
import { UserDto } from 'src/typeorm/user.entity';
import { WsCatch } from 'src/utils/catch';
import { CryptoService } from 'src/utils/crypto_service';
import { HttpExceptionCode } from 'src/utils/http_exception_code';
import { Equal, Repository } from 'typeorm';
import { MailerService } from '../mailer/mailer.service';
import { BaseResponse } from 'src/typeorm/response_base';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private repos: Repository<User>,
    private jwt: JwtService,
    private mailer: MailerService,
  ) {}
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
    else
      return this.repos.findOne({
        where: { email: process.env.SUPER_ADMIN_EMAIL },
      });
  }
  create({ by, body }: { by: UserDto; body: UserDto }) {
    logInfo({ by, action: `create user ${body.email}` });
    console.log(body);
    return this.repos
      .save(this.repos.create({ ...body, details: { byId: by.id } }))
      .then(async (value) => {
        const { id, email, firstname, lastname } = value;
        const token = await this.jwt.sign(
          { id, firstname, lastname, email },
          {
            secret: process.env.CRYPTO_KEY,
            expiresIn: 24 * 60 * 60 + 's',
          },
        );
        this.mailer.sendActivationMail({
          to: email,
          token,
        });
        if (value) return HttpExceptionCode.SUCCEEDED;
        throw new Error('Not created');
      })
      .catch(WsCatch);
  }
  get({ by }: { by: UserDto }) {
    return this.repos
      .find({
        relations: { role: true },
        where: { parent: [{ parentId: by.parentId }, { id: by.parentId }] },
      })
      .then((value) => BaseResponse.success(value))
      .catch(WsCatch);
  }
  getById({ id }: { id: number }) {
    return this.repos
      .findOne({
        where: { id },
        relations: { role: true, parent: true },
        select: {
          id: true,
          firstname: true,
          lastname: true,
          email: true,
          phone: true,
          address: { city: true, country: true, streetAddress:true},
          parent: { name: true, shortname: true, imagePath: true, id: true },
        },
      })
      .then((value) => BaseResponse.success(value))
      .catch(WsCatch);
  }
  update({ id, by, body }: { id: number; by: UserDto; body: UserDto }) {
    logInfo({ by, action: `update user idenfier by Id= ${id}` });
    return this.repos
      .update({ id: Equal(id) }, { ...body })
      .then((value) => {
        if (value.affected >= 1) return HttpExceptionCode.SUCCEEDED;
      })
      .catch(WsCatch);
  }
  findByEmail({ email }: { email: string }) {
    return this.repos
      .findOneBy({ email: Equal(email) })
      .then((value) => {
        if (value) return value;
        throw new Error(`email not found`);
      })
      .catch(WsCatch);
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
      .catch(WsCatch);
  }
  async definePassword({ id, password }: { id: number; password: string }) {
    return this.repos.update(
      { id },
      {
        password: await CryptoService.createHash(password),
        passwordCrypt: await CryptoService.encrypt(password),
      },
    );
  }
  getProfile(by: UserDto) {
    console.log(by);
    return this.repos
      .findOne({
        where: { id: Equal(by.id) },
        relations: {
          parent: { parent: true },
          role: { rolePermission: { permission: { module: true } } },
        },
      })
      .then((value) => value)
      .catch(WsCatch);
  }
}
