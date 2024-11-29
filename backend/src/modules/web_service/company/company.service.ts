import { EstablishmentType } from 'src/typeorm/establishment_type';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { EntityProviderEnum } from 'src/typeorm/entity_provider_enum';
import { BaseResponse } from 'src/typeorm/response_base';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { IsNull, Repository, In, Like } from 'typeorm';
import { join } from 'path';
import { WsCatch } from 'src/utils/catch';
import { selectCompanyDefaultItem } from './company_select';
import { Company } from 'src/typeorm/partner/company.entity';

@Injectable()
export class WsCompanyService {
  constructor(
    @Inject(EntityProviderEnum.COMPANY)
    private repos: Repository<Company>,
    @Inject(EntityProviderEnum.ESTABLISHMENT_TYPE)
    private establishmentTypeRepos: Repository<EstablishmentType>,
  ) { }

  getByEstablishmentType() {
    return this.establishmentTypeRepos
      .find({
        where: { isActive: true },
        relations: { company: { shop: true } },
        select: {
          id: true,
          description: true,
          isActive: true,
          name: true,
          company: {
            id: true,
            closingTime: true,
            openingTime: true,
            shortname: true,
            name: true,
            imagePath: true,
            backgroundPath: true, description: true,
            shop: { backgroundPath: true, name: true, id: true, location: { longitude: true, latitude: true } },
            location: { latitude: true, longitude: true },
          },
        },
      })
      .then((ets) => {
        return BaseResponse.success(ets);
      });
  }
  getById({ id }: { id: number }) {
    return this.repos
      .findOne({
        where: { id },
        relations: {
          establishmentType: true,
          category: { product: { file: true } },
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
      .findOne({ where: { id: id }, relations: { company: true } })
      .then((result) => {
        return this.repos
          .find({ where: { establishmentTypeId: id } })
          .then((shops) => {
            result.company = shops.sort(() => Math.random() * 0.5);
            return BaseResponse.success(result);
          });
      })
      .catch(WsCatch);
  }
  search({ name }: { name: string }) {
    return this.repos
      .find({
        where: {
          name: Like(name), 
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
