import { HttpException, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryData } from 'src/data/category';
import { Category, CategoryDto } from 'src/typeorm/category.entity';
import { EntityProviderEnum } from 'src/typeorm/entity_provider_enum';
import { BaseResponse } from 'src/typeorm/response_base';
import { WsCatch } from 'src/utils/catch';
import { HttpExceptionCode } from 'src/utils/http_exception_code';
import { Repository } from 'typeorm';
@Injectable()
export class CategoryService implements OnModuleInit {
  constructor(
    @Inject(EntityProviderEnum.CATEGORY) private repos: Repository<Category>,
  ) {}
  onModuleInit() {
    // throw new Error('Method not implemented.');
    this.initializeCategory();
  }
  async createWithChildren(body: CategoryDto, parent?: Category) {
    try {
      if (
        !(await this.repos.exist({
          where: { name: body.name },
        }))
      )
        return this.repos.manager
          .getTreeRepository<Category>(Category)
          .save({ name: body.name, parent: parent })
          .then(async (value) => {
            if (body?.children && body?.children?.length > 0) {
              return await Promise.all(
                body.children.map((item) =>
                  this.createWithChildren(
                    {
                      name: item.name,
                    },
                    value,
                  ),
                ),
              ).then((value1) => BaseResponse.success(value1));
            }
            return BaseResponse.success(value);
          });
    } catch (error) {}
  }
  async initializeCategory() {
    const root =
      (await this.repos.findOne({ where: { name: 'root' } })) ??
      (await this.repos.save({ name: 'root' }));
    return Promise.all(
      CategoryData.map(async (item) => {
        return await this.createWithChildren(
          { name: item.name, children: item.children },
          root,
        );
      }),
    ).then((value) => console.log(value));
  }
  async get() {
    return this.repos.manager
      .getTreeRepository(Category)
      .findTrees()
      .then((value) => BaseResponse.success(value))
      .catch(WsCatch);
  }
  async getAll() {
    return this.repos
      .find()
      .then((value) => BaseResponse.success(value))
      .catch(WsCatch);
  }
  async update({ id, body }: { id: number; body: CategoryDto }) {
    return this.repos.manager
      .getTreeRepository(Category)
      .update({ id }, { ...body })
      .then((value) => {
        console.log(value);
        return HttpExceptionCode.SUCCEEDED;
      })
      .catch(WsCatch);
  }
}
