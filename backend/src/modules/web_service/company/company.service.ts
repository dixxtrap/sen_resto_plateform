import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyRestaurantBase } from 'src/typeorm';
import { BaseResponse } from 'src/typeorm/response_base';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { IsNull, Repository, In } from 'typeorm';

@Injectable()
export class WsCompanyService {
  constructor(
    @InjectRepository(CompanyRestaurantBase)
    private repos: Repository<CompanyRestaurantBase>,
  ) {}
  getAll() {
    return this.repos
      .find({
        where: {
          parent: { parentId: IsNull() },
          type: In(['CompanyRestaurant', 'restaurant']),
        },
      })
      .then((result) => {
        return BaseResponse.success(result.sort(() => Math.random() - 0.5));
      })
      .catch((err) => {
        console.log(err);
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }
}
