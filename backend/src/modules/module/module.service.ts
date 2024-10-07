import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { OnModuleInit } from '@nestjs/common/interfaces/hooks/on-init.interface';
import { EntityProviderEnum } from 'src/typeorm/entity_provider_enum';
import { ModuleEntity, ModuleEntityDto } from 'src/typeorm/module.entity';
import { BaseResponse } from 'src/typeorm/response_base';
import { WsCatch } from 'src/utils/catch';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class ModuleService implements OnModuleInit {
  constructor(
    @Inject(EntityProviderEnum.MODULE_ENTITY) private repos: Repository<ModuleEntity>,
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
       
        return Promise.all(
          value.map(async (item) => {
            const exits = await this.repos.exists({
              where: { name: item[`Tables_in_${process.env.DB_NAME}`] },
            });
            if (!exits)
              return this.repos
                .save(
                  this.repos.create({
                    name: item[`Tables_in_${process.env.DB_NAME}`],
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
      .catch(WsCatch);
  }
  update({ id, body }: { id: number; body: ModuleEntityDto }) {
    return this.repos
      .update({ id: Equal(id) }, { ...body })
      .then((value) => value)
      .catch(WsCatch);
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
      .catch(WsCatch);
  }
}
