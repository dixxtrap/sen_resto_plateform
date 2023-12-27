import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/typeorm';
import { RoleDto } from 'src/typeorm/role.entity';
import { HttpExceptionCode } from 'src/utils/http_exception_code';
import { Equal, Repository } from 'typeorm';
import { RolePermissionService } from '../role_permsion/role_permission.service';
import { RolePermissionDto } from 'src/typeorm/role_permissison.entity';
import { PermissionDto } from 'src/typeorm/permission.entity';

@Injectable()
export class RoleService { 
  constructor(
    @InjectRepository(Role) private repos: Repository<Role>,
    private rolePermissionService: RolePermissionService,
  ) {}
  initRole() {
    return this.repos.manager.getTreeRepository(Role).save(
      this.repos.manager.getTreeRepository(Role).create({
        name: 'super_admin',
        description: 'controller toute la plateform',
      }),
    );
  }
  getAll() {
    return this.repos.manager
      .getTreeRepository(Role)
      .findTrees()
      .then((result) => result)
      .catch((e) => {
        console.log(e);
        throw new HttpException(HttpExceptionCode.FAILLURE, 500);
      });
  }
  getById({ id }: { id: number }) {
    return this.repos
      .findOne({
        where: { id: Equal(id) },
        // relations: { rolePermission: { permission: true } },
      })
      .then((result) => result)
      .catch((e) => {
        console.log(e);
        throw new HttpException(HttpExceptionCode.FAILLURE, 500);
      });
  }
  getPermissionById({ id }: { id: number }) {
    return this.repos
      .findOne({
        where: { id: Equal(id) },
        relations: { rolePermission: { permission: true } },
      })
      .then((result) => result)
      .catch((e) => {
        console.log(e);
        throw new HttpException(HttpExceptionCode.FAILLURE, 500);
      });
  }
  create({ body }: { body: RoleDto }) {
    return this.repos.manager
      .getTreeRepository(Role)
      .save({ ...body })
      .then((result) => {
        console.log(result);
        if (result) return HttpExceptionCode.SUCCEEDED;
      })
      .catch((e) => {
        console.log(e);
        throw new HttpException(HttpExceptionCode.FAILLURE, 500);
      });
  }
  update({
    id,
    body,
    permissions,
  }: {
    id: number;
    body: RoleDto;
    permissions: RolePermissionDto[];
  }) {
    return this.repos
      .update({ id: Equal(id) }, body)
      .then((result) => {
        if (result) return HttpExceptionCode.SUCCEEDED;
      })
      .catch((e) => {
        console.log(e);
        throw new HttpException(HttpExceptionCode.FAILLURE, 500);
      });
  }

  addMultiplePermission({
    roleId,
    permissions,
  }: {
    roleId: number;
    permissions: PermissionDto[];
  }) {
    return this.rolePermissionService.addMultiple({ roleId, permissions });
  }
  removeMultiplePermission({
    roleId,
    permissions,
  }: {
    roleId: number;
    permissions: RolePermissionDto[];
  }) {
    return this.rolePermissionService.removeMultiple({ roleId, permissions });
  }
}
