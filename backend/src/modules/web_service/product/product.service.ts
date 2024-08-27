import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityProviderEnum } from 'src/typeorm/entity_provider_enum';

import { Product } from 'src/typeorm/product.entity';
import { BaseResponse } from 'src/typeorm/response_base';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { Repository, Not, Equal, Like, In } from 'typeorm';

@Injectable()
export class WsProductService {
  constructor(@Inject(EntityProviderEnum.PRODUCT) private repos: Repository<Product>) {}
  getAll() {
    return this.repos
      .find({
        relations: { file: true, parent: true , category:true},
        select: { parent: { shortname: true, id: true , imagePath:true,},  category:{id:true, name:true}},
      })
      .then((result) => {
        return BaseResponse.success(result.sort(() => Math.random() - 0.5));
      })
      .catch((err) => {
        console.log(err);
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }
  search({ name, categoryIds }: { name: string; categoryIds: number[] }) {
    return this.repos
      .find({
        where: {
          name: Like(name),
          ...(categoryIds && categoryIds.length > 0
            ? { category: In(categoryIds) }
            : {}),
        },
        relations: { file: true, parent: true },
        select: { parent: { shortname: true, id: true } },
      })
      .then((result) => {
        return BaseResponse.success(result.sort(() => Math.random() - 0.5));
      })
      .catch((err) => {
        console.log(err);
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }
  getAllByCompanyId({ id }: { id: number }) {
    return this.repos
      .find({
        where: { parentId: id },
        relations: { file: true, parent: true },
        select: { parent: { shortname: true, id: true } },
      })
      .then((result) => {
        return BaseResponse.success(result.sort(() => Math.random() - 0.5));
      })
      .catch((err) => {
        console.log(err);
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }

  getDiscounted() {
    return this.repos
      .find({
        where: { reduction: Not(Equal(0)) },
        relations: { category: true, file: true, parent: true },
        select: { parent: { shortname: true, id: true } },
      })
      .then((result) => {
        return BaseResponse.success(result);
      })
      .catch((err) => {
        console.log(err);
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }
  getById({ id }: { id: number }) {
    return this.repos
      .findOne({ where: { id }, relations: { category: true, file: true } })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }
}
