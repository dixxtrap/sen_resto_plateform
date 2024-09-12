import { FC, ReactNode, useState } from "react";
import { OrderDto, OrderProduct } from '../../../../cores/models/order.dto';
import { Button, Modal,Text, ScrollArea, Pill, Avatar, HoverCard, Stepper, ButtonGroup, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { EyeIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { OrderPaymentType } from "./order_payment_type";
import { AddressForm } from "../../../components/form/address_form";
import { useForm } from "@mantine/form";
type OrderWidgetProps = {
  order: OrderDto;
};

export const OrderDetailsItem = ({
  value,
  label,
}: {
  value?: ReactNode;
  label?: ReactNode;
  magnify?: boolean;
}) => {
  return (
    <div className="flex my-1 justify-between">
      {label}
     {value}
    </div>
  );
};
export const OrderProductRecap=({orderProduct}:{orderProduct:OrderProduct})=>{
  return (<div key={orderProduct.productHistoryId} className="py-3"><Text  className="font-bold">{orderProduct.productHistory.product.name}</Text>
   
    <div className="my-3 flex">
{orderProduct.productHistory.product.file?.map(f=><HoverCard key={f.path}>
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
    {orderProduct.productHistory.product.category?.slice(0,3).map(c=><Pill>{c.name}</Pill>)}
    </div>
<div>

</div>
    <div>
      {OrderDetailsItem({label:<span>Prix Unitaire</span>, value:`${orderProduct.productHistory?.price!} ${import.meta.env.VITE_REACT_CURRENCY}`})}
      <Textarea defaultValue={orderProduct.description} label={"Description"}/>
      {OrderDetailsItem({label:'Pieces', value:<ButtonGroup className="rounded-lg "p={0}  m={0}>
        <Button radius={4}  size="compact-sm"><PlusIcon className="text-white size-5"/></Button>
        <Button size="compact-sm">{orderProduct.quantity}</Button>
        <Button radius={4} m={0} size="compact-sm"> <MinusIcon className="text-white size-5"/></Button>
      </ButtonGroup>})}
      {OrderDetailsItem({label:<span>Total</span>, value:`${orderProduct.productHistory?.price*orderProduct.quantity* (100-orderProduct.productHistory?.reduction)/100} ${import.meta.env.VITE_REACT_CURRENCY}`, magnify:true})}
     
    </div>
    </div>)
}
export const OrderDetailWidget: FC<OrderWidgetProps> = ({ order }) => {
  const [opened,{open, close}]=useDisclosure()
  const [active, setActive]=useState(0)
  const form=useForm();
  return (

   <>
   <Modal opened={opened} title={<div>{order.partner.name}</div>} onClose={close }>
<ScrollArea className="h-[75vh] relative">
<Stepper size="sm" active={active} iconSize={28} classNames={{content:"pt-10", steps:"absolute pb-2 border-b z-[300]  top-0 w-full bg-white"}} onStepClick={setActive} allowNextStepsSelect={false}>
        <Stepper.Step  label={active==0?<span>Recapulatif</span>:null}  >
          <div className="flex flex-col divide-y space">
        {order.products.map(op=>(
         <OrderProductRecap key={op.productHistoryId} orderProduct={op}/>))}
    </div>
        </Stepper.Step>
        <Stepper.Step label={active==1?"Details Livraison":null} >
        <AddressForm form={form}/>
        </Stepper.Step>
        <Stepper.Step label= {active==2?"Payment":null} >
        <OrderPaymentType/>
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>
  <div className="flex flex-col gap-5 divide-y">

   
    
    <div className="h-20 "></div>
    <div className="pt-2 absolute w-full  bottom-0 bg-white z-50">
    <ButtonGroup className="  ">
  <Button  color="primary.4" variant="filled" onClick={()=>setActive(active-1)} className=" z-50  grow    ">precedent</Button>
  <Button color="secondary.6" variant="filled" onClick={()=>setActive(active+1)} className=" z-50 grow   ">suivant</Button>
       
    </ButtonGroup>
    </div>
  
  </div>
</ScrollArea>
   </Modal>
   <Button onClick={open}  leftSection={<EyeIcon className="size-5"/>} className="grow">
            Confirmer
          </Button>
   </>
  );
};
