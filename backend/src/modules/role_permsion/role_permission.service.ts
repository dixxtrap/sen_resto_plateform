import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionDto } from 'src/typeorm/permission.entity';
import {
  RolePermission,
  RolePermissionDto,
} from 'src/typeorm/role_permissison.entity';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { Equal, In, Repository } from 'typeorm';
@Injectable()
export class RolePermissionService {
  constructor(
    @InjectRepository(RolePermission) private repos: Repository<RolePermission>,
  ) {}
  create({ body }: { body: RolePermissionDto }) {
    return this.repos
      .save(this.repos.create(body))
      .then((result) => {
        //       console.log(result);
        if (result) return HttpExceptionCode.SUCCEEDED;
        else throw new WsMessage(HttpExceptionCode.FAILLURE);
      })
      .catch((err) => {
        if (err instanceof WsMessage) throw err;
        console.log(err);
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }
  update({ body }: { body: RolePermissionDto }) {
    const { permissionId, roleId, ...config } = body;
    return this.repos
      .update(
        { permissionId: Equal(permissionId), roleId: Equal(roleId) },
        config,
      )
      .then((result) => {
        //       console.log(result);
        if (result) return HttpExceptionCode.SUCCEEDED;
        else throw new WsMessage(HttpExceptionCode.FAILLURE);
      })
      .catch((err) => {
        if (err instanceof WsMessage) throw err;
        console.log(err);
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }
  updateMultiple({
    roleId,
    permissions,
  }: {
    roleId: number;
    permissions: RolePermissionDto[];
  }) {
    return this.repos
      .delete({
        roleId: Equal(roleId),
        permissionId: In(permissions.map((item) => item.permissionId)),
      })
      .then(() => {
        throw new WsMessage(HttpExceptionCode.SUCCEEDED);
      })
      .catch((err) => {
        if (err instanceof WsMessage) throw err;
        else throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }
  addMultiple({
    roleId,
    permissions,
  }: {
    roleId: number;
    permissions: PermissionDto[];
  }) {
    return Promise.all(
      permissions.map((item) => {
        this.create({
          body: {
            permissionId: item.id,
            roleId: roleId,
            canUse: true,
            canInherit: true,
          },
        });
      }),
    )
      .then((result) => {
        throw new WsMessage(HttpExceptionCode.SUCCEEDED);
      })
      .catch((err) => {
        if (err instanceof WsMessage) throw err;
        else throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }
  removeMultiple({
    roleId,
    permissions,
  }: {
    roleId: number;
    permissions: RolePermissionDto[];
  }) {
    return this.repos
      .delete({
        roleId: Equal(roleId),
        permissionId: In(permissions.map((p) => p.permissionId)),
      })
      .then(() => {
        throw new WsMessage(HttpExceptionCode.SUCCEEDED);
      })
      .catch((err) => {
        if (err instanceof WsMessage) throw err;
        else throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }
}
