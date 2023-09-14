import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { exceptionCode } from 'src/data/exception_code';
import { RoleDto } from 'src/dto/role.dto';
import { PermissionRole, Role } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private repos: Repository<Role>,
    @InjectRepository(PermissionRole)
    private reposPermission: Repository<PermissionRole>,
  ) {}

  async post(body: RoleDto) {
    return await this.repos.save(this.repos.create(body));
  }
  async getS() {
    return this.repos.find();
  }
  async get(id: number) {
    return this.repos.findOne({
      where: { id },
      relations: { permission: true },
    });
  }
  async update(id: number, body: RoleDto) {
    const newBody = await this.repos.update(id, body);
    if (newBody.affected > 0) {
      return exceptionCode.SUCCEEDED;
    } else {
      throw new HttpException(exceptionCode.FAILLURE, 400);
    }
  }
}
