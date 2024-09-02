import { FC } from "react";
import { OrderDto } from "../../../../cores/models/order.dto";

import {

  ActionIcon,
  Avatar,
  Badge,
  Button,
  ButtonGroup,
  Image,
  Text,
} from "@mantine/core";
import { EyeIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { CompanyEnum } from "../../../../cores/models/company.dto";

type OrderWidgetProps = {
  order: OrderDto;
};
export const OrderWidget: FC<OrderWidgetProps> = ({ order }) => {

  return (
    <div key={`order_${order.id}`} className="ring-1 hover:shadow-xl h-min  p-3 flex flex-col duration-150 ring-gray-300 overflow-hidden  rounded-md ">
     {/* {order.partner.type} */}
     <div>   <Image className="h-20 w-auto mx-auto my-10" src={order.partner.type===CompanyEnum.COMPANY? order.partner.imagePath:order.partner.parent?.imagePath} />
     </div>
      <div className=" flex flex-col  gap-3">
        <div className="flex  ">
          <div>
            <Text className="text-2xl font-bold">
              {order.partner.shortname}
            </Text>
            <Text className="text-sm font-thin">{order.partner.name}</Text>
          </div>
          <div className="grow"></div>

      
        </div>
        <div className="flex gap-3">
          {order.products.slice(0,2).map((e) => (
            <Badge
              w={"auto"}
              classNames={{ label: "text-sm" }}
              variant="light"
              size="xl"
              className="h-10 p-0   pr-1 text-lg"
           
              leftSection={
                <Avatar src={e.productHistory?.product?.file![0]?.path} />
              }
            >
              <div className="flex  gap-2">
              <span className="text-sm"> {e.productHistory.product.name}</span>
              <span className="text-white bg-primary-600 size-4 rounded-full text-center">{e.quantity}</span>
              </div>
            </Badge>
          ))}
          {order.products.length>2&& <ActionIcon radius={100} size={"lg"}><PlusIcon className="size-10"/></ActionIcon>}
        </div>
        <div className="flex justify-between">
          <span>Total</span>
       {order&&   <span className="text-2xl font-bold">{order.products.map((_e, j)=>j).map((i)=>(Number((order.products[i]?.productHistory.price* (100-(order.products[i]?.productHistory.reduction!??0)))))/100* order.products[i].quantity).reduce((p1,p2)=>p1+p2)} FCFA</span>}
        </div>
        <ButtonGroup className="grow w-fit min-w-full ">
          <Button leftSection={<TrashIcon className="size-5"/>} color="primary" className="grow">
            Annuler
          </Button>
          <Button leftSection={<EyeIcon className="size-5"/>} className="grow">
            Confirmer
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};
