import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/typeorm/category.entity';
import { BaseResponse } from 'src/typeorm/response_base';
import { Repository, Equal, Not } from 'typeorm';
export class WsCategoryService {
  constructor(
    @InjectRepository(Category) private repos: Repository<Category>,
  ) {}
  getBase() {
    return this.repos
      .find({ where: {parent: {name: Equal('root') }} })
      .then((result) => {
        return BaseResponse.success(result);
      });
  }
getAll() {
    return this.repos
      .find({ where: { name: Not(Equal('root')) } })
      .then((result) => {
        return BaseResponse.success(result);
      });
  }
}
  