import { InjectRepository } from '@nestjs/typeorm';
import { ProductHistory } from 'src/typeorm/product_history.entity';
import { Repository } from 'typeorm';
import { UserDto } from '../../../typeorm/user.entity';
import { ProductHistoryDto } from '../../../typeorm/product_history.entity';
import { BaseResponse } from 'src/typeorm/response_base';
import { WsCatch } from 'src/utils/catch';
import { logInfo } from 'src/app_log';
import { ProductManagement } from 'src/typeorm/product_management.entity';
import { CompanyRestaurantBase } from 'src/typeorm/company_restaurant.entity';
import { CoordonatesDto } from 'src/typeorm/coordonates.entity';
import { calcDistance } from 'src/utils/calc_distance';

export class ProductHistoryService {
  constructor(
    @InjectRepository(ProductHistory) private repos: Repository<ProductHistory>,
    @InjectRepository(ProductManagement)
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
        relations: { details: { by: true } },
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
    let minDistancePartner: CompanyRestaurantBase;

    minDistance = -1;
    console.log('========product management========', id);
    return this.reposManagement
      .find({ where: { productId: id }, relations: { partner: true } })
      .then((productManagements) => {
        console.log('========product management========', productManagements);

        productManagements.forEach((productManagement, index) => {
          console.log(
            '========product location========',
            productManagement.partner.location,
            from,
          );
          const distance = calcDistance({
            from: from,
            to: productManagement.partner.location,
          });
          if (index == 0) {
            minDistancePartner = productManagement.partner;
            minDistance = distance;
          } else if (distance < minDistance) {
            minDistancePartner = productManagement.partner;
            minDistance = distance;
          }
        });
        return minDistancePartner;
      })
      .catch(WsCatch);
  }
}
