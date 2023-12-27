import { HttpException, Injectable, Module } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ModuleEntity, ModuleEntityDto } from 'src/typeorm/module.entity';
import { HttpExceptionCode } from 'src/utils/http_exception_code';
import { Equal, IsNull, Repository } from 'typeorm';

@Injectable()
export class ModuleService {
  constructor(
    @InjectRepository(ModuleEntity) private repos: Repository<ModuleEntity>,
  ) {}
  async initialTable() {

    return this.repos.save(this.repos.create({ name: 'root' })).then((root) => {
      return this.repos.manager.query('show tables').then(
        async (
          value: {
            Tables_in_sen_resto_test: string;
          }[],
        ) => {
          return Promise.all(
            value.map(async (item) => {
              return this.repos
                .save(
                  this.repos.create({
                    name: item.Tables_in_sen_resto_test,
                    parentId: root.id,
                  }),
                )
                .then((module) => {
                  return module;
                });
            }),
          );
        },
      );
    });
  }
  create(body: ModuleEntityDto) {
    return this.repos
      .save(this.repos.create(body))
      .then((value) => value)
      .catch((error) => {
        console.log(error);
        throw new HttpException(HttpExceptionCode.FAILLURE, 400);
      });
  }
  update({ id, body }: { id: number; body: ModuleEntityDto }) {
    return this.repos
      .update({ id: Equal(id) }, { ...body })
      .then((value) => value)
      .catch((error) => {
        console.log(error);
        throw new HttpException(HttpExceptionCode.FAILLURE, 400);
      });
  }
  get() {
    return this.repos.manager
      .getTreeRepository(ModuleEntity)
      .findTrees()
      .then((value) => value)
      .catch((error) => {
        console.log(error);
        throw new HttpException(HttpExceptionCode.FAILLURE, 400);
      });
  }
}
