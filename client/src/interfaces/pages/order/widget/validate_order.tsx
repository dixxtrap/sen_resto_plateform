import { FC, ReactNode, useState } from "react";
import { OrderDto, OrderProduct } from "../../../../cores/models/order.dto";
import {
  Button,
  Modal,
  Text,

  Avatar,
  Stepper,

  ActionIcon,
  ScrollAreaAutosize,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {  MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
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
export const OrderProductRecap = ({
  orderProduct,
}: {
  orderProduct: OrderProduct;
}) => {
  return (
    <div key={orderProduct.productHistoryId} className="p-0.5 grid gap-2  grid-cols-12">
      <Text className="font-bold col-span-12">
        {orderProduct.productHistory.product.name}
      </Text>

      <div className=" col-span-4  rounded-md  ring-1 ring-gray-300 ">
        {orderProduct.productHistory.product.file?.slice(0,1)?.map((f) => (
          
                <Avatar className=" w-full h-full mx-auto  " radius={8} src={f.path} />
              

        ))}
      </div>
      {/* <div className="flex flex-nowrap w-full overflow-x-scroll gap-2 snap-mandatory">
        {orderProduct.productHistory.product.category?.slice(0, 3).map((c) => (
          <Pill>{c.name}</Pill>
        ))}
      </div> */}
      
      <div className="flex col-span-8 flex-col ">
        {OrderDetailsItem({
          label: <span>Prix Unitaire</span>,
          value: `${orderProduct.productHistory?.price!} ${
            import.meta.env.VITE_REACT_CURRENCY
          }`,
        })}
     
        
        {OrderDetailsItem({
          label: "Pieces",
          value: (
            <div className="rounded-lg  flex items-center justify-center gap-2" >
              <ActionIcon   className="size-8 rounded-full">
                <PlusIcon className="text-white size-5" />
              </ActionIcon>
              <span >{orderProduct.quantity}</span>
              <ActionIcon   className="size-8 rounded-full">
                {" "}
                <MinusIcon className="text-white size-5" />
              </ActionIcon>
            </div>
          ),
        })}
        {OrderDetailsItem({
          label: <span>Total</span>,
          value: `${
            (orderProduct.productHistory?.price *
              orderProduct.quantity *
              (100 - orderProduct.productHistory?.reduction)) /
            100
          } ${import.meta.env.VITE_REACT_CURRENCY}`,
          magnify: true,
        })}
      </div>
    </div>
  );
};
export const OrderDetailWidget: FC<OrderWidgetProps> = ({ order }) => {
  const [opened, { open, close }] = useDisclosure();
  const [active, setActive] = useState(0);
  const form = useForm();
  return (
    <>
      <Modal
        opened={opened}
        title={<div>{order.partner.name}</div>}
        onClose={close}
      >
        <div className="flex h-[74vh] flex-col">

        
        <ScrollAreaAutosize className="grow">
          <Stepper
            size="sm"
            active={active}
            iconSize={28}
            classNames={{
              content: "pt-10",
              steps: "sticky pb-2 border-b z-[300]  top-0 w-full bg-white",
            }}
            onStepClick={setActive}
            allowNextStepsSelect={false}
          >
            
            <Stepper.Step label={active == 0 ? <span>Recapulatif</span> : null}>
              <div className="flex flex-col gap-4 divide-y space">
                {order.products.map((op) => (
                  <OrderProductRecap
                    key={op.productHistoryId}
                    orderProduct={op}
                  />
                ))}
              </div>
            </Stepper.Step>
            <Stepper.Step label={active == 1 ? "Details Livraison" : null}>
              <AddressForm form={form} />
            </Stepper.Step>
            <Stepper.Completed  >
              <OrderPaymentType  order={order}/>
            </Stepper.Completed>
            
          </Stepper>
          </ScrollAreaAutosize>
        <div className="pt-2  w-full  flex justify-between  bg-white z-50">
              
                <Button
                  color="primary.4"
                  variant="filled"
                  onClick={() => setActive(active - 1)}
                  className=" z-50     "
                >
                  precedent
                </Button>
                <Button
                  color="secondary.6"
                  variant="filled"
                  onClick={() => setActive(active + 1)}
                  className=" z-50    "
                >
                  suivant
                </Button>
              
            </div>
            </div>
      </Modal>
      <Button
        onClick={open}
        color="green"
        
        className="ring ring-green-400"
      >
        Confirmer
      </Button>
    </>
  );
};
