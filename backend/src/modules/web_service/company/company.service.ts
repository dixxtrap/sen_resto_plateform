import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyRestaurantBase } from 'src/typeorm';
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
        return result;
      })
      .catch((err) => {
        console.log(err);
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }
}
