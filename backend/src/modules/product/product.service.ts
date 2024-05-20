import { Injectable } from '@nestjs/common';
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

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private repos: Repository<Product>,
    @InjectRepository(ProductHistory)
    private reposHistory: Repository<ProductHistory>,
    @InjectRepository(ProductCategory)
    private reposCategory: Repository<ProductCategory>,
    private productManagementService: ProductManagementService,
    private weekdayService: WeekdayService,
    private productHistoryService: ProductHistoryService,
  ) {}
  create({ by, body }: { by: UserDto; body: ProductDto }) {
    return this.repos
      .save(
        this.repos.create({
          ...body,
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
            if (value) return HttpExceptionCode.SUCCEEDED;
            throw new WsMessage(HttpExceptionCode.FAILLURE);
          });
      })
      .catch((err) => {
        if (err instanceof WsMessage) throw err;
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }

  update({ by, body, id }: { by: UserDto; body: ProductDto; id: number }) {
    const { category, ...rest } = body;
    return this.repos.findOne({ where: { id } }).then((old) =>
      this.repos
        .update(
          { id },
          {
            ...rest,
          },
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
          if (category.length > 0) {
            return this.reposCategory
              .delete({ productId: id })
              .then(() => {
                return Promise.all(
                  category.map((cat) => {
                    this.reposCategory.save({
                      productId: id,
                      categoryId: cat.id,
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
