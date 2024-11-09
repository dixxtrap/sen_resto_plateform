import { InjectRepository } from '@nestjs/typeorm';
import { ProductHistory } from 'src/typeorm/product_history.entity';
import { Repository } from 'typeorm';
import { UserDto } from '../../../typeorm/user.entity';
import { ProductHistoryDto } from '../../../typeorm/product_history.entity';
import { BaseResponse } from 'src/typeorm/response_base';
import { WsCatch } from 'src/utils/catch';
import { logInfo } from 'src/app_log';
import { ProductManagement } from 'src/typeorm/product_management.entity';
import { CompanyShop } from 'src/typeorm/partner/company_shop.entity'
import { CoordonatesDto } from 'src/typeorm/coordonates.entity';
import { calcDistance } from 'src/utils/calc_distance';
import { EntityProviderEnum } from 'src/typeorm/entity_provider_enum';
import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
@Injectable()
export class ProductHistoryService {
  constructor(
    @Inject(EntityProviderEnum.PRODUCT_HISTORY) private repos: Repository<ProductHistory>,
    @Inject(EntityProviderEnum.PRODUCT_MANAGEMENT)
    private reposManagement: Repository<ProductManagement>,
  ) {}
  create({ by, body }: { by: UserDto; body: ProductHistoryDto }) {
    return this.repos
      .save(this.repos.create({ ...body, details: { byId: by.id } }))
      .then((result) => {
        return BaseResponse.success(result) as BaseResponse<ProductHistory>;
      });
  }
  all({ id, by }: { id: number; by: UserDto }) {
    logInfo({ by, action: `get history for product ${id}` });
    return this.repos
      .find({ where: { id }, relations: { details: { by: true } } })
      .then(
        (result) =>
          BaseResponse.success(result) as BaseResponse<ProductHistory[]>,
      )
      .catch(WsCatch);
  }
  last({ id }: { id: number }) {
    return this.repos
      .findOne({
        where: { productId: id },
        relations: { details: { by: true }, product:true },
        order: { details: { createdAt: -1 } },
      })
      .then(
        (result) =>
          BaseResponse.success(result) as BaseResponse<ProductHistory>,
      )
      .catch(WsCatch);
  }

  getNearestPartner({ id, from }: { id: number; from: CoordonatesDto }) {
    let minDistance: number;
    let minDistancePartner: CompanyShop;

    minDistance = -1;
    console.log('========product management========', id);
    return this.reposManagement
      .find({ where: { productId: id }, relations: { shop: true } })
      .then((productManagements) => {
        console.log('========product management========', productManagements);

        productManagements.forEach((productManagement, index) => {
          console.log(
            '========product location========',
            productManagement.shop.location,
            from,
          );
          const distance = calcDistance({
            from: from,
            to: productManagement.shop.location,
          });
          if (index == 0) {
            minDistancePartner = productManagement.shop;
            minDistance = distance;
          } else if (distance < minDistance) {
            minDistancePartner = productManagement.shop;
            minDistance = distance;
          }
        });
        return minDistancePartner;
      })
      .catch(WsCatch);
  }
}
