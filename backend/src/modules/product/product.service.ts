import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product, ProductDto } from 'src/typeorm/product.entity';
import { UserDto } from 'src/typeorm/user.entity';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { Repository } from 'typeorm';
import { ProductManagementService } from './management/product_management.service';
import { ProductCategory } from 'src/typeorm/product_category.entity';
import { BaseResponse } from 'src/typeorm/response_base';
import { ProductHistory } from 'src/typeorm/product_history.entity';
import { ProductHistoryService } from './history/product_history.service';
import { EntityProviderEnum } from 'src/typeorm/entity_provider_enum';
import { WsCatch } from 'src/utils/catch';
import { ProductFileService } from './file/product_file.service';

@Injectable()
export class ProductService {
  constructor(
    @Inject(EntityProviderEnum.PRODUCT) private repos: Repository<Product>,

     // private // private reposHistory: Repository<ProductHistory>,
    private productManagementService: ProductManagementService,
    private productHistoryService: ProductHistoryService,
    private productFileService: ProductFileService,
  ) {}
  create({
    by,
    body,
    file,
  }: {
    by: UserDto;
    body: ProductDto;
    file?: Express.Multer.File;
  }) {
    const { categoryIds, ...rest } = body;
    return this.repos
      .save(
        this.repos.create({
          ...rest,
          companyId: by.companyId,
          details: { byId: by.id },
        }),
      )
      .then(async (value) => {
        if (value) {
          const { name, cookingTime, reduction, price } = value;
          await this.productHistoryService.create({
            by,
            body: {
              name,
              cookingTime,
              reduction,
              price,
              productId: value.id,
            },
          });

          return this.productFileService
            .create({
              body: { productId: value.id, idActive: true, path: file.path },
              file,
            })
            .then((result) => {
              throw new WsMessage(HttpExceptionCode.SUCCEEDED);
            });
        } else throw new WsMessage(HttpExceptionCode.FAILLURE);
      })
      .catch(WsCatch);
  }

  update({ by, body, id }: { by: UserDto; body: ProductDto; id: number }) {
    const { categoryIds, ...rest } = body;
    console.log('===========body==========', body);

    return this.repos.findOne({ where: { id } }).then((old) =>
      this.repos
        .update(
          { id },
          this.repos.create({
            ...rest,
          }),
        )
        .then(async (value) => {
          if (old.reduction !== rest.reduction || old.price !== rest.price)
            await this.productHistoryService.create({
              by,
              body: {
                name: body.name ?? old.name,
                price: body.price ?? old.price,
                reduction: body.reduction ?? old.reduction,
                cookingTime: body.cookingTime ?? old.cookingTime,
                productId: old.id,
              },
            });

          throw new WsMessage(HttpExceptionCode.SUCCEEDED);
        })
        .catch((err) => {
          console.log(err);

          if (err instanceof WsMessage) throw err;
          throw new WsMessage(HttpExceptionCode.FAILLURE);
        }),
    );
  }
  getProductById({ by, id }: { by: UserDto; id: number }) {
    return this.repos
      .findOne({ where: { id }, relations: { file: true } })
      .then((value) => {
        console.log(value);
        if (value) return BaseResponse.success(value);
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      })
      .catch(WsCatch);
  }
 
  updateManyManagement({
    body,
    by,
    partnerId,
  }: {
    body: Array<number>;
    by: UserDto;
    partnerId: number;
  }) {
    return this.productManagementService.updateMany({ body:body, by, partnerId });
  }
  updateManagement({
    body,
    by,
    partnerId,
  }: {
    body: boolean;
    by: UserDto;
    partnerId: number;
  }) {
    return this.productManagementService.updateOne({ body:body, id:partnerId });
  }
  getAll({ by }: { by: UserDto }) {
    return this.repos
      .find({
        where: { companyId: by.companyId },
        relations: { file: true, companyCategory: true },
        order: { companyCategory: { name: 'ASC' } },
      })
      .then((result) => BaseResponse.success(result));
  }
  getByShop({
    partnerId,
    by,
  }: {
    partnerId: number;
    by: UserDto;
  }) {
    return this.productManagementService.getAllByShop({
      id:partnerId,
    });
  }
}
