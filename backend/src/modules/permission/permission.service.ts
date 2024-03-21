import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/typeorm';
import {
  PermissionActionEnum,
  PermissionDto,
} from 'src/typeorm/permission.entity';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { Equal, Repository } from 'typeorm';
import { ModuleService } from '../module/module.service';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission) private repos: Repository<Permission>,
    private module: ModuleService,
  ) {}
  initPermission() {
    return this.module.getAll().then((value) => {
      return Promise.all(
        value.map((e) => {
          const permissions = [
            PermissionActionEnum.create,
            PermissionActionEnum.read,
            PermissionActionEnum.update,
            PermissionActionEnum.delete,
            PermissionActionEnum.details,
            PermissionActionEnum.all,
          ].map((action) => {
            console.log(`${action}_${e.name}`);
            return this.repos.create({
              action: action,
              moduleId: e.id,
              name: `${action}_${e.name}`,
              code: `${action}_${e.name}`,
            });
          });
          return this.repos.save(permissions).then((p) => {
            return p;
          });
        }),
      );
    });
  }
  create({ body }: { body: PermissionDto }) {
    return this.repos
      .save(this.repos.create(body))
      .then((result) => result)
      .catch((e) => {
        console.log(e);
        throw new HttpException(HttpExceptionCode.FAILLURE, 500);
      });
  }
  update({ id, body }: { id: number; body: PermissionDto }) {
    return this.repos
      .update({ id: Equal(id) }, body)
      .then((result) => {
        if (result.affected > 0) return HttpExceptionCode.SUCCEEDED;
        throw new WsMessage({ ...HttpExceptionCode.NOT_FOUND });
      })
      .catch((e) => {
        console.log(e);
        if (e instanceof WsMessage) throw e;
        throw new HttpException(HttpExceptionCode.FAILLURE, 500);
      });
  }
  getAll() {
    return this.repos
      .find({ relations: { module: true } })
      .then((result) => {
        return result;
      })
      .catch((e) => {
        console.log(e);
        throw new HttpException(HttpExceptionCode.FAILLURE, 500);
      });
  }
}
