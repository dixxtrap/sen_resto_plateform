import { EstablishmentType } from 'src/typeorm/establishment_type';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyRestaurantBase } from 'src/typeorm';
import { EntityProviderEnum } from 'src/typeorm/entity_provider_enum';
import { BaseResponse } from 'src/typeorm/response_base';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { IsNull, Repository, In, Like } from 'typeorm';
import { join } from 'path';
import { WsCatch } from 'src/utils/catch';

@Injectable()
export class WsCompanyService {
  constructor(
    @Inject(EntityProviderEnum.COMPANY_RESTAURANT_BASE)
    private repos: Repository<CompanyRestaurantBase>,
    @Inject(EntityProviderEnum.ESTABLISHMENT_TYPE)
    private establishmentTypeRepos: Repository<EstablishmentType>,
  ) {}
  getAll() {
    return this.repos
      .find({
        where: {
          parent: { parentId: IsNull() },
          type: In(['CompanyRestaurant', 'restaurant']),
        },
        relations: { establishmentType: true },
      })
      .then((result) => {
        return BaseResponse.success(result.sort(() => Math.random() - 0.5));
      })
      .catch((err) => {
        console.log(err);
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }
  getByEstablishmentType() {
    return this.establishmentTypeRepos
      .find({ where: { isActive: true } })
      .then((ets) => {
        return Promise.all(
          ets.map(async (et, i) => {
            ets[i].company = (await this.repos
              .createQueryBuilder('partner')
              .where('partner.establishmentTypeId=:id', { id: et.id })
              .orderBy('RAND()')
              .limit(12)
              .getMany()) as CompanyRestaurantBase[];
            return null;
          }),
        ).then(() => BaseResponse.success(ets));
      });
  }
  getById({ id }: { id: number }) {
    return this.repos
      .findOne({
        where: { id },
        relations: {
          parent: true,
          establishmentType: true,
          category: { product: { file: true, category: true } },
        },
      })
      .then((result) => {
        result.category = result.category.sort(
          (a, b) => b.priority - a.priority,
        );
        return BaseResponse.success(result);
      });
  }
  getbyEstablishmentId({ id }: { id: number }) {
    return this.establishmentTypeRepos
      .findOne({ where: { id: id, }, relations:{company:true} })
      .then((result) => {
        result.company=result.company.sort(()=>Math.random()*0.5)
        return BaseResponse.success(result)
      })
      .catch(WsCatch);
  }
  search({ name }: { name: string }) {
    return this.repos
      .find({
        where: {
          name: Like(name),
          parent: { parentId: IsNull() },
          type: In(['CompanyRestaurant', 'restaurant']),
        },
        relations: { establishmentType: true },
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
