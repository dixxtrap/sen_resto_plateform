import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WebSocketServer } from '@nestjs/websockets/decorators/gateway-server.decorator';
import { ProductHistoryService } from 'src/modules/product/history/product_history.service';
import { CustomerDto } from 'src/typeorm/customer.entity';
import { EntityProviderEnum } from 'src/typeorm/entity_provider_enum';
import {
  AddOrderDto,
  Order,
  OrderDto,
  OrderStatus,
} from 'src/typeorm/order.entity';
import { OrderProduct } from 'src/typeorm/order_product.entity';
import { Repository } from 'src/typeorm/repository';
import { BaseResponse } from 'src/typeorm/response_base';
import { CreateUserDto } from 'src/typeorm/user.entity';
import { WsCatch } from 'src/utils/catch';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { Server } from 'socket.io';
import { ChatGateway } from 'src/chat/chat.gateway';
import { orderBagSelect } from './order.select';
import { getNearestPoint } from 'src/utils/calc_distance';
@Injectable()
export class WsOrderService {
  constructor(
    @Inject(EntityProviderEnum.ORDER) private repos: Repository<Order>,
    @Inject(EntityProviderEnum.ORDER_PRODUCT)
    private orderProductRepos: Repository<OrderProduct>,
    private productHistoryService: ProductHistoryService,
    private chatGateway: ChatGateway,
  ) {}

  update({ id, body }: { id: number; body: OrderDto }) {
    console.log(body);
    return this.repos
      .update({ id: id }, { ...body, fees: 1500 })
      .then((result) => {
        console.log(result);
        if (result.affected > 0)
          throw new WsMessage(HttpExceptionCode.SUCCEEDED);
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      })
      .catch(WsCatch);
  }
  getBag({ by }: { by: CustomerDto }) {
    return this.repos
      .find({
        where: { customerId: by.id, status:OrderStatus.OnBag },
        relations: {
          partner: { parent: true },
          products: {
            productHistory: { product: { file: true, category: true } },
          },
        },
        select: orderBagSelect,
      })
      .then((result) => {
        return BaseResponse.success(result);
      });
  }
  getByStatus = ({
    by,
    status,
  }: {
    by: CreateUserDto;
    status: OrderStatus;
  }) => {
    return this.repos.find({
      where: { status },
      relations: {
        partner: true,
        products: {
          productHistory: { product: { file: true } },
        },
      },
      select: orderBagSelect,
    });
  };
  changeStatus = async ({
    id,
    status,
  }: {
    id: number;
    status: OrderStatus;
  }) => {
    return this.repos
      .update({ id }, { status: status })
      .then(() => {
        throw new WsMessage(HttpExceptionCode.SUCCEEDED);
      })
      .catch(WsCatch);
  };
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
          partner: [{ id: partnerId }],
          status: OrderStatus.OnBag,
        },
        relations: { products: true },
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

  async confirmOrder({ id }: { id: number; by: CustomerDto }) {
     console.log("==================update start================");
    return this.repos
      .findOneOrFail({
        where: { id },
        relations: { partner: { children: true }, city: true },
      })
      .then((order) => {
        const restaurantId = getNearestPoint({
          froms: [
            ...order.partner.children.map((e) => ({
              id: e.id,
              coordonate: e.location,
            })),
            {
              id: order.partner.id,
              coordonate: order.partner.location,
            },
          ],
          to: order.city,
        });
        return this.repos
          .update({ id }, { status: OrderStatus.Active, restaurantId })
          .then(() => {
            console.log("==================update successFully================")
            this.chatGateway.server.emit('messageFrom', {
              id: order.partnerId,
            });
            this.chatGateway.server.emit('messageFrom', {
              id: order.restaurantId,
            });
            throw new WsMessage(HttpExceptionCode.SUCCEEDED);
          });
      })
      .catch(WsCatch);
  }
  async addProductToOrder({
    body,
    by,
  }: {
    body: AddOrderDto;
    by: CustomerDto;
  }) {
    console.log('==========customer=========', by);
    return this.productHistoryService
      .last({ id: body.productId })
      .then((productHistory) => {
        console.log(productHistory);
        return this.getOrderOrCreate({
          customerId: by.id,
          partnerId: productHistory.data.product.parentId,
        }).then((order) => {
          return (
            !(body.quantity === 0)
              ? this.orderProductRepos.save(
                  this.orderProductRepos.create({
                    productHistoryId: productHistory.data.id,
                    quantity: body.quantity,
                    orderId: order.id,
                  }),
                )
              : this.orderProductRepos
                  .delete({
                    productHistoryId: productHistory.data.id,
                    orderId: order.id,
                  })
                  .then((delResult) => {
                    if (!order.products || order.products.length === 1) {
                      return this.repos.delete({ id: order.id });
                    }
                    return delResult;
                  })
          ).then((result) => {
            try {
              this.chatGateway.server.emit('messageFrom', {
                id: productHistory.data.product.parentId,
              });
            } catch (err) {
              console.log(err);
            }

            if (result) throw new WsMessage(HttpExceptionCode.SUCCEEDED);
            else throw new WsMessage(HttpExceptionCode.FAILLURE);
          });
        });
      })
      .catch(WsCatch);
  }

  delete({ id }: { id: number }) {
    return this.repos
      .findOne({ where: { id }, relations: { products: true } })
      .then((old) => {
        if (!old) throw new WsMessage(HttpExceptionCode.FAILLURE);
        return this.orderProductRepos
          .delete({ orderId: old.id })
          .then((del) => {
            if (del)
              return this.repos.delete({ id: id }).then(() => {
                throw new WsMessage(HttpExceptionCode.SUCCEEDED);
              });
            throw new WsMessage(HttpExceptionCode.NOT_FOUND);
          });
      });
  }
}
