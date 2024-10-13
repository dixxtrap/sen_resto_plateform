import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product, ProductDto } from 'src/typeorm/product.entity';
import { UserDto } from 'src/typeorm/user.entity';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { Repository } from 'typeorm';
import { ProductManagementService } from './management/product_management.service';
import { WeekdayService } from './week_day/weekday.service';
import { ProductCategory } from 'src/typeorm/product_category.entity';
import { ProductManagementDayDto } from 'src/typeorm/product_management.entity';
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
    @Inject(EntityProviderEnum.PRODUCT_HISTORY)
    private reposHistory: Repository<ProductHistory>,
    @Inject(EntityProviderEnum.PRODUCT_CATEGORY)
    private reposCategory: Repository<ProductCategory>,
    private productManagementService: ProductManagementService,
    private weekdayService: WeekdayService,
    private productHistoryService: ProductHistoryService,
    private productFileService:ProductFileService
  ) {}
  create({ by, body, file }: { by: UserDto; body: ProductDto , file?:Express.Multer.File}) {
    const {categoryIds, ...rest}=body
    return this.repos
      .save(
        this.repos.create({
          ...rest,
          parentId: by.parentId,
          details: { byId: by.id },
        }),
      )
      .then((value) => {
        return this.productManagementService
          .create({
            partnerId: by.parentId,
            productId: value.id,
            isActive: true,
          })
          .then(() => {
            const { name, cookingTime, reduction, price } = value;
            this.productHistoryService.create({
              by,
              body: {
                name,
                cookingTime,
                reduction,
                price,
                productId: value.id,
              },
            });
            if (value)
              if (categoryIds&& categoryIds.length > 0) {
              return this.reposCategory
                .delete({ productId: value.id })
                .then(() => {
                  return Promise.all(
                    categoryIds.map((cat) => {
                      this.reposCategory.save({
                        productId: value.id,
                        categoryId: cat,
                      });
                    }),
                  );
                })
                .then(async () => {
                  if (value) throw new WsMessage(HttpExceptionCode.SUCCEEDED);
                  throw new WsMessage(HttpExceptionCode.FAILLURE);
                });
            } else {
             return  this.productFileService.create({body:{productId:value.id, idActive:true, path:file.path}, file}).then(result=>{throw new WsMessage(HttpExceptionCode.SUCCEEDED)})
              ;
            };
            throw new WsMessage(HttpExceptionCode.FAILLURE);
          });
      })
      .catch(WsCatch);
  }

  update({ by, body, id }: { by: UserDto; body: ProductDto; id: number }) {
    const { categoryIds,...rest } = body;
    console.log("===========body==========", body)
 
    return this.repos.findOne({ where: { id } }).then((old) =>
      this.repos
        .update(
          { id }, 
         this.repos.create( {
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
          if (categoryIds.length > 0) {
            return this.reposCategory
              .delete({ productId: id }) 
              .then(() => {
                return Promise.all(
                  categoryIds.map((cat) => {
                    this.reposCategory.save({
                      productId: id,
                      categoryId: cat,
                    });
                  }),
                );
              })
              .then(async () => {
                if (value) throw new WsMessage(HttpExceptionCode.SUCCEEDED);
                throw new WsMessage(HttpExceptionCode.FAILLURE);
              });
          } else {
            throw new WsMessage(HttpExceptionCode.SUCCEEDED);
          }
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
      .findOne({ where: { id }, relations: { category: true, file: true } })
      .then((value) => {
        console.log(value);
        if (value) return BaseResponse.success(value);
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      })
      .catch((err) => {
        console.log(err);

        if (err instanceof WsMessage) throw err;
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }
  getProductMamangement(by: UserDto) {
    return this.productManagementService.getAll({ by });
  }
  getProductMamangementById({ id, by }: { by: UserDto; id: number }) {
    return this.productManagementService
      .getById({ by, id })
      .then((result) => result);
  }
  addMultiProductManagement({
    body,
    by,
    partnerId,
  }: {
    body: ProductDto[];
    by: UserDto;
    partnerId: number;
  }) {
    return this.productManagementService.addMultiple({ body, by, partnerId });
  }
  getWeekDay() {
    return this.weekdayService.getAll();
  }

  updateManagementDay(body: ProductManagementDayDto[]) {
    return this.productManagementService.updateManagementDay(body);
  }
  getAvailableProductForRestaurant({
    partnerId,
    by,
  }: {
    partnerId: number;
    by: UserDto;
  }) {
    return this.productManagementService.getAvailableProductForRestaurant({
      partnerId,
    });
  }
}
