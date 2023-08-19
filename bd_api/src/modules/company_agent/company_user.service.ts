import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CompanyUserDto,
  CompanyUserDtoGet,
  CompanyUserDtoUpdate,
} from 'src/dto/company_user.dto';
import { CompanyUser } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyUserService {
  constructor(
    @InjectRepository(CompanyUser) private repos: Repository<CompanyUser>,
  ) {}
  getS() {
    return this.repos.find({
      relations: {
        user: {
          profile: true,
          role: true,
        },
      },
    });
  }
  async get(id: number) {
    return await this.repos.findOne({
      where: { id },
      relations: {
        user: {
          profile: true,
          role: true,
        },
      },
    });
  }
  async create(item: CompanyUserDto) {
    try {
      return await this.repos.save(this.repos.create(item));
    } catch (error) {
      throw new HttpException({ ...error }, error.code ?? 500);
    }
  }
  async update(id: number) {
    try {
      const oldCompUser = await this.repos.findOneBy({ id });
      if (!oldCompUser) throw new NotFoundException();
      await this.repos.update({ id: id }, { isActive: !oldCompUser.isActive });
      return { ...oldCompUser, isActive: !oldCompUser.isActive };
    } catch (error) {
      throw new HttpException({ ...error }, error.code ?? 500);
    }
  }
}
