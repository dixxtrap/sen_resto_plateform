

import { Permission } from 'src/typeorm';
import {
  PermissionActionEnum,
  PermissionDto,
} from 'src/typeorm/permission.entity';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { Equal, Repository } from 'typeorm';
import { ModuleService } from '../module/module.service';
import { EntityProviderEnum } from 'src/typeorm/entity_provider_enum';
import { OnModuleInit } from '@nestjs/common/interfaces/hooks/on-init.interface';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
import { WsCatch } from 'src/utils/catch';

@Injectable()
export class PermissionService implements OnModuleInit {
  constructor(
    @Inject(EntityProviderEnum.PERMISSION) private repos: Repository<Permission>,
    private module: ModuleService,
  ) {}
  onModuleInit() {
    this.initPermission();
  }
  initPermission() {
    return this.module.getAll().then((value) => {
      return Promise.all(
        value.data.map((e) => {
          return [
            PermissionActionEnum.create,
            PermissionActionEnum.read,
            PermissionActionEnum.update,
            PermissionActionEnum.delete,
            PermissionActionEnum.details,
            PermissionActionEnum.all,
          ].map((action) => {
           
            return this.repos
              .exists({
                where: {
                  code: `${action}_${e.name}`,
                },
              })
              .then((exist) => {
                if (!exist)
                  return this.repos.save({
                    action: action,
                    moduleId: e.id,
                    name: `${action}_${e.name}`,
                    code: `${action}_${e.name}`,
                  });
              });
          });
        }),
      );
    });
  }
  create({ body }: { body: PermissionDto }) {
    return this.repos
      .save(this.repos.create(body))
      .then((result) => result)
      .catch(WsCatch);
  }
  update({ id, body }: { id: number; body: PermissionDto }) {
    return this.repos
      .update({ id: Equal(id) }, body)
      .then((result) => {
        if (result.affected > 0) return HttpExceptionCode.SUCCEEDED;
        throw new WsMessage({ ...HttpExceptionCode.NOT_FOUND });
      })
      .catch(WsCatch);
  }
  getAll() {
    return this.repos
      .find({ relations: { module: true }, order: { module: { name: 1 } } })
      .then((result) => {
        return result;
      })
      .catch(WsCatch);
  }
}
