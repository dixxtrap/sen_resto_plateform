import { FC } from "react";
import { OrderDto } from "../../../../cores/models/order.dto";
import clsx from "clsx";
import { Button, Modal,Text, ScrollArea, Pill, Avatar, Tooltip, HoverCard } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { EyeIcon } from "@heroicons/react/24/solid";
import { TextConstant } from "../../../../cores/constant/textConstant";
import { OrderPaymentType } from "./order_payment_type";
type OrderWidgetProps = {
  order: OrderDto;
};

export const OrderDetailsItem = ({
  value,
  label,
  magnify,
}: {
  value?: string;
  label?: string;
  magnify?: boolean;
}) => {
  return (
    <div className="flex my-1 justify-between">
      <span className="grow">{label}</span>
      <span
        className={clsx(
          magnify &&
            "ring-1  font-bold rounded-md   bg-white  ring-gray-500/30 ",
          " text-center  px-3 "
        )}
      >
        {value}
      </span>
    </div>
  );
};

export const OrderDetailWidget: FC<OrderWidgetProps> = ({ order }) => {
  const [opened,{open, close}]=useDisclosure()
  return (
   <>
   <Modal opened={opened} title={<div>{order.partner.name}</div>} onClose={close }>
<ScrollArea className="h-[75vh] relative">
  <div className="flex flex-col gap-5 divide-y">
  {order.products.map(p=>(<div key={p.productHistoryId}><Text  className="font-bold">{p.productHistory.product.name}</Text>
    <Text>{p.description}</Text>
    <div className="my-3 flex">
{p.productHistory.product.file?.map(f=><HoverCard key={f.path}>
  <HoverCard.Target>
    <div>
    <Avatar className="h-20 w-auto" radius={8} src={f.path}/>
    </div>
 
  </HoverCard.Target>
  
  <HoverCard.Dropdown   className="top-0 left-0">
  <Avatar className="h-32 w-auto"  radius={8} src={f.path}/>
  </HoverCard.Dropdown>
  </HoverCard>)}
</div>
      <div className="flex flex-nowrap w-full overflow-x-scroll gap-2 snap-mandatory">
    {p.productHistory.product.category?.slice(0,3).map(c=><Pill>{c.name}</Pill>)}
    </div>
<div>

</div>
    <div>
      {OrderDetailsItem({label:'price', value:`${p.productHistory?.price!} ${import.meta.env.VITE_REACT_CURRENCY}`})}
      {OrderDetailsItem({label:'Pieces', value:`${p.quantity} `})}
      {OrderDetailsItem({label:'Total', value:`${p.productHistory?.price!*p.quantity* (100-p.productHistory?.reduction)/100} ${import.meta.env.VITE_REACT_CURRENCY}`, magnify:true})}
    </div>
    </div>))}
    <OrderPaymentType/>
  <Button className="absolute bottom-0 w-full h-12 bg-primary-500">Valider</Button>
  </div>
</ScrollArea>
   </Modal>
   <Button onClick={open}  leftSection={<EyeIcon className="size-5"/>} className="grow">
            Confirmer
          </Button>
   </>
  );
};
