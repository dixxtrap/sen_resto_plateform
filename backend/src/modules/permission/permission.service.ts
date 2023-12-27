import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/typeorm';
import { PermissionDto } from 'src/typeorm/permission.entity';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission) private repos: Repository<Permission>,
  ) {}
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
