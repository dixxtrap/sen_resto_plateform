import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductHistoryService } from 'src/modules/product/history/product_history.service';
import { CustomerDto } from 'src/typeorm/customer.entity';
import { AddOrderDto, Order, OrderStatus } from 'src/typeorm/order.entity';
import { OrderProduct } from 'src/typeorm/order_product.entity';
import { Repository } from 'src/typeorm/repository';
import { BaseResponse } from 'src/typeorm/response_base';
import { WsCatch } from 'src/utils/catch';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';

@Injectable()
export class WsOrderService {
  constructor(
    @InjectRepository(Order) private repos: Repository<Order>,
    @InjectRepository(OrderProduct)
    private orderProductRepos: Repository<OrderProduct>,
    private productHistoryService: ProductHistoryService,
  ) {}
  getBag({ by }: { by: CustomerDto }) {
    return this.repos
      .find({
        where: { customerId: by.id },
        relations: {
          partner: true,
          products: {
            productHistory: { product: { file: true } },
          },
        },
        select: {
          id: true,
          partnerId: true,
          details: {
            createdAt: true,
            updatedAt: true,
          },
          partner: {
            name: true,
            type: true,
            parent: {
              name: true,
            },
          },
          products: {
            quantity: true,
            description: true,

            productHistoryId: true,
            productHistory: {
              productId: true,
              price: true,
              reduction: true,
              product: {
                id: true,
                name: true,
                cookingTime: true,
                description: true,
                file: { path: true },
              },
            },
          },
        },
      })
      .then((result) => {
        return BaseResponse.success(result);
      });
  }
  getOrderOrCreate = async ({
    customerId,
    partnerId,
  }: {
    customerId: number;
    partnerId: number;
  }) => {
    const order =
      (await this.repos.findOne({
        where: {
          customerId: customerId,
          partnerId: partnerId,
          status: OrderStatus.OnBag,
        },
      })) ??
      (await this.repos.save(
        this.repos.create({
          partnerId: partnerId,
          customerId: customerId,
          status: OrderStatus.OnBag,
        }),
      ));
    return order;
  };
  async addProductToOrder({
    body,
    by,
  }: {
    body: AddOrderDto;
    by: CustomerDto;
  }) {
    console.log('customer', by);
    return this.productHistoryService
      .getNearestPartner({ id: body.productId, from: by.location })
      .then((partner) => {
        return this.getOrderOrCreate({
          customerId: by.id,
          partnerId: partner.id,
        }).then((order) => {
          return this.productHistoryService
            .last({ id: body.productId })
            .then((productHistory) => {
              if (productHistory) {
                return this.orderProductRepos
                  .save(
                    this.orderProductRepos.create({
                      productHistoryId: productHistory.data.id,
                      description: body.description,
                      quantity: body.quantity,
                      orderId: order.id,
                    }),
                  )
                  .then((result) => {
                    if (result)
                      throw new WsMessage(HttpExceptionCode.SUCCEEDED);
                    else throw new WsMessage(HttpExceptionCode.FAILLURE);
                  });
              }
            });
        });
      })
      .catch(WsCatch);
  }
}
