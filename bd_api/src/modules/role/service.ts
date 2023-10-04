import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { exceptionCode } from 'src/data/exception_code';
import { PermissionDto } from 'src/dto/permission.dto';
import { RoleDto } from 'src/dto/role.dto';
import { Permission, PermissionRole, Role } from 'src/typeorm';
import { In, Repository, Not } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private repos: Repository<Role>,
    @InjectRepository(Permission) private permission: Repository<Permission>,
    @InjectRepository(PermissionRole)
    private reposPermission: Repository<PermissionRole>,
  ) {}

  async post(body: RoleDto) {
    return await this.repos.save(this.repos.create(body));
  }
  async getS() {
    return this.repos.find({ relations: { permission: false } });
  }
  async get(id: number) {
    const role = await this.repos.findOne({
      where: { id },
      relations: {
        permission: true,
        user: { company: true, restaurant: true },
      },
    });
    const permissions = await this.reposPermission.find({
      where: {
        roleId: role.id,
        permissionId: In(role.permission.map((p) => p.id)),
      },
    });

    return {
      ...role,
      permission: permissions.map((p) => {
        return {
          ...role.permission.filter((p1) => p1.id === p.permissionId)[0],
          ...p,
          id: p.permissionId,
        };
      }),
    };
  }
  async getRolePermission(id: number) {
    const role = await this.repos.findOne({
      where: { id },
      relations: { permission: true },
    });
    const permissions = await this.reposPermission.find({
      where: {
        roleId: role.id,
        permissionId: In(role.permission.map((p) => p.id)),
      },
    });

    return {
      ...role,
      permission: permissions.map((p) => {
        return {
          ...role.permission.filter((p1) => p1.id === p.permissionId)[0],
          ...p,
          id: p.permissionId,
        };
      }),
    };
  }
  async getPermission(id: number) {
    return (
      await this.repos.findOne({
        where: { id: id },
        relations: { permission: true, user: true },
      })
    ).permission;
  }
  async getNoValidPermision(id) {
    const perm = await this.getPermission(id);
    return this.permission.find({
      where: {
        id: Not(In(perm.map((e) => e.id))),
      },
    });
  }
  async deletePermission(id: number, body: PermissionDto[]) {
    await Promise.all(
      body.map(async (e) => {
        const rolePerm = await this.reposPermission.delete({
          permissionId: e.id,
          roleId: id,
        });
      }),
    );
    return exceptionCode.SUCCEEDED;
  }
  async addPermission(id: number, body: PermissionDto[]) {
    await Promise.all(
      body.map(async (e) => {
        const rolePerm = await this.reposPermission.findOne({
          where: { permissionId: e.id, roleId: id },
        });
        if (!rolePerm)
          return this.reposPermission.save(
            this.reposPermission.create({ permissionId: e.id, roleId: id }),
          );
        return rolePerm;
      }),
    );
    return exceptionCode.SUCCEEDED;
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
