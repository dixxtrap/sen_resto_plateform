
import {
  RolePermission,
  RolePermissionDto,
} from 'src/typeorm/role_permissison.entity';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { Equal, In, Repository } from 'typeorm';
import { PermissionService } from '../permission/permission.service';
import { WsCatch } from 'src/utils/catch';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
import { EntityProviderEnum } from 'src/typeorm/entity_provider_enum';
@Injectable()
export class RolePermissionService {
  constructor(
    @Inject(EntityProviderEnum.ROLE_PERMISSION) private repos: Repository<RolePermission>,
    private permission: PermissionService,
  ) {}
  initroleAdmin() {
    return this.permission.getAll().then((value) => {
      return Promise.all(
        value.map((e) => {
          return this.create({
            body: {
              roleId: parseInt(process.env.SUPER_ADMIN_ROLE_ID),
              permissionId: e.id,
              canUse: true,
              canInherit: true,
            },
          });
        }),
      );
    });
  }
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
    permissions: number[];
  }) {
    return this.repos
      .delete({
        roleId: Equal(roleId),
      })
      .then(() => {
        return  this.repos.save(permissions.map(p=>this.repos.create({roleId:roleId,permissionId:p }))).then(val=>{throw new  WsMessage(HttpExceptionCode.SUCCEEDED)})
      })
      .catch(WsCatch);
  }
}
