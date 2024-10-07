import { FC } from "react";
import { OrderDto } from "../../../../cores/models/order.dto";

import {
  ActionIcon,

  Image,

  Pill,
  Text,
} from "@mantine/core";
import {
  
  PlusIcon,
  
} from "@heroicons/react/24/solid";
import { CompanyEnum } from "../../../../cores/models/company.dto";
import { OrderDetailWidget } from "./validate_order";
import { DeleteOrder } from "./delete_order";

type OrderWidgetProps = {
  order: OrderDto;
};
export const OrderWidget: FC<OrderWidgetProps> = ({ order }) => {
 
 
  return (
    <div
      key={`order_${order.id}`}
      className="ring-1 hover:shadow-xl h-full  p-3 flex  duration-150 ring-gray-300 overflow-hidden  rounded-md "
    >
      {/* {order.partner.type} */}

      <div className=" flex flex-col w-full  h-full gap-3">
        <div className="flex  items-start  justify-start ">
          <Image
            className="h-10 w-auto"
            src={
              order.partner.type === CompanyEnum.RESTO &&
              order.partner.parentId == 1
                ? order.partner.parent?.imagePath
                : order.partner.imagePath
            }
          />
          <div>
            <Text className="text-2xl font-bold">
              {order.partner.shortname}
            </Text>
            <Text className="text-sm font-thin">{order.partner.name}</Text>
          </div>
        </div>
        <div className="flex gap-3 w-full">
          {order.products.slice(0, 2).map((e) => (
            <Pill
              key={e.productHistoryId}
              w={"auto"}
              classNames={{ label: "text-sm" }}
            >
              <div className="flex items-center  gap-2">
                <span className="text-sm">
                  {" "}
                  {e.productHistory.product.name}
                </span>
                <span className="text-white leading-3 p-0.5 bg-primary-500 size-4 rounded-full text-center">
                  {e.quantity}
                </span>
              </div>
            </Pill>
          ))}
          {order.products.length > 2 && (
            <ActionIcon radius={100} size={"sm"}>
              <PlusIcon className="size-10" />
            </ActionIcon>
          )}
        </div>
        <div className="flex justify-between w-full">
          <span>Total</span>
          {order && (
            <span className="text-2xl font-bold">
              
              {order.products
                .map((_e, j) => j)
                .map(
                  (i) =>
                    (Number(
                      order.products[i]?.productHistory.price *
                        (100 -
                          (order.products[i]?.productHistory.reduction! ?? 0))
                    ) /
                      100) *
                    order.products[i].quantity
                )
                .reduce((p1, p2) => p1 + p2)}{" "}
              FCFA
            </span>
          )}
        </div>
      
        <div className="grow flex justify-between w-fit min-w-full ">
          <DeleteOrder orderId={order.id}/>
          <OrderDetailWidget order={order} />
        </div>
      </div>
    </div>
  );
};
