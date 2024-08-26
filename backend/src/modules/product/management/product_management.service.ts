import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ProductManagement,
  ProductManagementDay,
  ProductManagementDayDto,
  ProductManagementDto,
} from 'src/typeorm/product_management.entity';
import { Repository } from 'typeorm';
import { WeekdayService } from '../week_day/weekday.service';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { UserDto } from 'src/typeorm/user.entity';
import { ProductDto } from 'src/typeorm/product.entity';
import { BaseResponse } from 'src/typeorm/response_base';
@Injectable()
export class ProductManagementService {
  constructor(
    @InjectRepository(ProductManagement)
    private repos: Repository<ProductManagement>,
    @InjectRepository(ProductManagementDay)
    private reposDayManagement: Repository<ProductManagementDay>,
    private weekdayService: WeekdayService,
  ) {}
  create(body: ProductManagementDto) {
    return this.repos
      .save(this.repos.create(body))
      .then((productManagement) => {
        this.weekdayService
          .getAll()
          .then((weekdays) => {
            return Promise.all(
              weekdays.map((day) => {
                return this.reposDayManagement.save(
                  this.reposDayManagement.create({
                    dayId: day.id,
                    productManagementId: productManagement.id,
                    isActive: true,
                  }),
                );
              }),
            );
          })
          .then(() => {
            return HttpExceptionCode.SUCCEEDED;
          })
          .catch((err) => {
            if (err instanceof WsMessage) throw err;
            console.log(err);
            throw new WsMessage(HttpExceptionCode.FAILLURE);
          });
      })
      .catch((err) => {
        if (err instanceof WsMessage) throw err;
        console.log(err);
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }
  addMultiple({
    by,
    body,
    partnerId,
  }: {
    by: UserDto;
    body: ProductDto[];
    partnerId: number;
  }) {
    return Promise.all(
      body.map((item) => {
        return this.create({
          partnerId: partnerId,
          productId: item.id,
          isActive: true,
          details: { byId: by.id },
        });
      }),
    )
      .then(() => {
        throw new WsMessage(HttpExceptionCode.SUCCEEDED);
      })
      .catch((err) => {
        if (err instanceof WsMessage) throw err;
        else throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }
  remove({
    body,
    isRequest = false,
  }: {
    body: ProductManagementDto;
    isRequest?: boolean;
  }) {
    return this.reposDayManagement
      .delete({
        productManagementId: body.id,
      })
      .then(() => {
        return this.repos
          .delete({
            partnerId: body.partnerId,
            productId: body.productId,
          })
          .then((result) => {
            if (result.affected > 0) {
              if (isRequest) throw new WsMessage(HttpExceptionCode.SUCCEEDED);
              else return HttpExceptionCode.SUCCEEDED;
            }
            throw new WsMessage(HttpExceptionCode.NOT_FOUND);
          });
      })
      .catch((err) => {
        if (err instanceof WsMessage) throw err;
        console.log(err);
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }
  removeMultiple({ body }: { body: ProductManagementDto[] }) {
    return Promise.all(
      body.map((item) => this.remove({ body: item, isRequest: false })),
    )
      .then(() => {
        throw new WsMessage(HttpExceptionCode.SUCCEEDED);
      })
      .catch((err) => {
        if (err instanceof WsMessage) throw err;
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }
  getAll({ by }: { by: UserDto }) {
    console.log(by);
    return this.repos
      .find({
        where: { partnerId: by.parentId },
        relations: {
          product: { file: true },
          productManagementDay: { day: true },
        },
      })
      .then((value) => {
        if (value) return BaseResponse.success(value);
        throw new WsMessage(HttpExceptionCode.NOT_FOUND);
      })
      .catch((err) => {
        if (err instanceof WsMessage) throw err;
        console.log(err);
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }

  getAvailableProductForRestaurant({ partnerId }: { partnerId: number }) {
    return this.repos
      .find({
        where: { partnerId: partnerId },
        relations: { product: { file: true } },
      })
      .then((value) => {
        if (value) return BaseResponse.success(value);
        throw new WsMessage(HttpExceptionCode.NOT_FOUND);
      })
      .catch((err) => {
        if (err instanceof WsMessage) throw err;
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }
  getById({ by, id }: { by: UserDto; id: number }) {
    return this.repos
      .findOne({
        where: { partnerId: by.parentId, productId: id },
        relations: {
          product: { file: true, category: true },
          productManagementDay: { day: true },
        },
      })
      .then((value) => {
        if (value) return BaseResponse.success(value);
        throw new WsMessage(HttpExceptionCode.NOT_FOUND);
      })
      .catch((err) => {
        if (err instanceof WsMessage) throw err;
        console.log(err);
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }

  updateManagementDay(body: ProductManagementDayDto[]) {
    return Promise.all(
      body.map((managementDay) => {
        return this.reposDayManagement
          .update(
            {
              productManagementId: managementDay.productManagementId,
              dayId: managementDay.dayId,
            },
            { isActive: managementDay.isActive },
          )
          .then(() => {
            return HttpExceptionCode.SUCCEEDED;
          });
      }),
    )
      .then(() => {
        throw new WsMessage(HttpExceptionCode.SUCCEEDED);
      })
      .catch((err) => {
        if (err instanceof WsMessage) throw err;
        console.log(err);
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }
}
