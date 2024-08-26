import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/typeorm';
import { RoleDto } from 'src/typeorm/role.entity';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { Equal, Like, Repository } from 'typeorm';
import { RolePermissionService } from '../role_permsion/role_permission.service';
import { RolePermissionDto } from 'src/typeorm/role_permissison.entity';
import { PermissionDto } from 'src/typeorm/permission.entity';
import { UserDto } from 'src/typeorm/user.entity';
import { WsCatch } from 'src/utils/catch';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private repos: Repository<Role>,
    private rolePermissionService: RolePermissionService,
  ) {}
  initRole() {
    return this.repos
      .exist({ where: { code: Like('super_admin') } })
      .then((exist) => {
        console.log(exist);
        return exist
          ? this.repos.findOneBy({ code: 'super_admin' })
          : this.repos.manager.getTreeRepository(Role).save(
              this.repos.manager.getTreeRepository(Role).create({
                code: 'super_admin',
                name: 'Super Admin',
                description: 'controller toute la plateform',
              }),
            );
      });
  }
  getAll({ by }: { by: UserDto }) {
    return this.repos
      .findOneBy({ id: by.roleId })
      .then((role) => {
        return this.repos.manager
          .getTreeRepository(Role)
          .findDescendantsTree(role)
          .then((result) => result);
      })

      .catch((e) => {
        console.log(e);
        throw new HttpException(HttpExceptionCode.FAILLURE, 500);
      });
  }
  getById({ id }: { id: number }) {
    console.log('----------------get by id-----------------');
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
    console.log(body);
    return this.repos.manager
      .getTreeRepository(Role)
      .save(
        this.repos.create({
          name: body.name,
          description: body.description,
          code: body.code,
          parent: body.parent,
        }),
      )
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
  }: {
    id: number;
    body: RoleDto;
   
    }) {
    const { permissions,...rest} = body;
    return this.repos
      .update({ id: Equal(id) }, rest)
      .then((result) => {
        if(permissions&& permissions?.length>0)return  this.rolePermissionService.updateMultiple({roleId:id, permissions})
        if (result.affected>0) throw new WsMessage(HttpExceptionCode.SUCCEEDED);
      })
      .catch(WsCatch);
  }

 
}
