import { Inject, Injectable } from '@nestjs/common';
import {
  ProductManagement,
  ProductManagementDto,
} from 'src/typeorm/product_management.entity';
import { Repository } from 'typeorm';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { UserDto } from 'src/typeorm/user.entity';
import { ProductDto } from 'src/typeorm/product.entity';
import { BaseResponse } from 'src/typeorm/response_base';
import { EntityProviderEnum } from 'src/typeorm/entity_provider_enum';
import { WsCatch } from 'src/utils/catch';
@Injectable()
export class ProductManagementService {
  constructor(
    @Inject(EntityProviderEnum.PRODUCT_MANAGEMENT)
    private repos: Repository<ProductManagement>,
  ) {}
  create(body: ProductManagementDto) {
    return this.repos
      .save(this.repos.create(body))
      .then(() => {
        return HttpExceptionCode.SUCCEEDED;
      })
      .catch((err) => {
        if (err instanceof WsMessage) throw err;
        console.log(err);
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }
  updateMany({
    by,
    body,
    partnerId,
  }: {
    by: UserDto;
    body: Array<number>;
    partnerId: number;
  }) {
    return this.repos
      .delete({ shopId: partnerId })
      .then((result) => {
        const managements: Array<ProductManagement> = [];
        new Set(body).forEach((e) => {
          managements.push(
            this.repos.create({
              productId: e,
              shopId: partnerId,
              isActive: true,
            }),
          );
        });
        return this.repos.save(managements).then(() => {
          throw new WsMessage(HttpExceptionCode.SUCCEEDED);
        });
      })
      .catch(WsCatch);
  }
  updateOne({ id, body }: { id: number; body: boolean }) {
    return this.repos
      .update({ id }, { isActive: body })
      .then((result) => {
        if (result.affected > 0)
          throw new WsMessage(HttpExceptionCode.SUCCEEDED);
        throw new WsMessage(HttpExceptionCode.NOT_FOUND);
        
      }).catch(WsCatch);
  }
  getAllByShop({ id }: { id:number  }) {
    // console.log(by);
    return this.repos
      .find({
        where: { shopId: id },
        relations: {
          product: { file: true },
        },
      })
      .then((value) => {
        if (value) return BaseResponse.success(value);
        throw new WsMessage(HttpExceptionCode.NOT_FOUND);
      })
      .catch(WsCatch);
  }
}
 