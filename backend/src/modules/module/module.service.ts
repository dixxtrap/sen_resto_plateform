import { HttpException, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { bdName } from 'src/mysql.config';
import { ModuleEntity, ModuleEntityDto } from 'src/typeorm/module.entity';
import { BaseResponse } from 'src/typeorm/response_base';
import { HttpExceptionCode } from 'src/utils/http_exception_code';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class ModuleService implements OnModuleInit {
  constructor(
    @InjectRepository(ModuleEntity) private repos: Repository<ModuleEntity>,
  ) {}
  onModuleInit() {
    this.initialTable();
  }

  async initialTable() {
    const root =
      (await this.repos.findOne({ where: { name: 'root' } })) ??
      (await this.repos.save(this.repos.create({ name: 'root' })));

    return this.repos.manager.query('show tables').then(
      async (
        value: {
          Tables_in_sen_resto: string;
        }[],
      ) => {
        console.log(value);
        return Promise.all(
          value.map(async (item) => {
            const exits = await this.repos.exist({
              where: { name: item[`Tables_in_${bdName}`] },
            });
            if (!exits)
              return this.repos
                .save(
                  this.repos.create({
                    name: item[`Tables_in_${bdName}`],
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
  getAll() {
    return this.repos
      .find()
      .then(
        (result) =>
          BaseResponse.success(result) as BaseResponse<ModuleEntity[]>,
      );
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
