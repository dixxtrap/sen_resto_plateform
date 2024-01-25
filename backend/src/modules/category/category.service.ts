import { HttpException, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryData } from 'src/data/category';
import { Category, CategoryDto } from 'src/typeorm/category.entity';
import { HttpExceptionCode } from 'src/utils/http_exception_code';
import { Repository } from 'typeorm';
@Injectable()
export class CategoryService implements OnModuleInit {
  constructor(
    @InjectRepository(Category) private repos: Repository<Category>,
  ) {}
  onModuleInit() {
    // throw new Error('Method not implemented.');
    // this.initializeCategory();
  }
  async createWithChildren(body: CategoryDto, parent?: Category) {
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
          ).then((value1) => value1);
        }
        return value;
      });
  }
  async initializeCategory() {
    const root = await this.repos.save({ name: 'root' });
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
      .then((value) => value)
      .catch((error) => {
        console.log(error);
        throw new HttpException(HttpExceptionCode.FAILLURE, 400);
      });
  }

  async update({ id, body }: { id: number; body: CategoryDto }) {
    return this.repos.manager
      .getTreeRepository(Category)
      .update({ id }, { ...body })
      .then((value) => {
        console.log(value);
        return HttpExceptionCode.SUCCEEDED;
      })
      .catch((err) => {
        console.log(err);
        throw new HttpException(HttpExceptionCode.FAILLURE, 400);
      });
  }
}
