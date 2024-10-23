import { ProductDto } from "../../../../cores/models/product";
import {
  Card,
  Image,
  Group,
  Text,
  Modal,
  ActionIcon,
  Space,
  Pill,
} from "@mantine/core";

import { PlateItemPoppup } from "./order_poppup";

import clsx from "clsx";
import { PlusIcon } from "@heroicons/react/24/solid";
import { reductionPrice } from "../../../../utils/calcul";
import { ProtectedAction } from "../../../components/login/login_form";
import { useDisclosure } from "@mantine/hooks";
import { OrderProduct } from "../../../../cores/models/order.dto";

export const ProductItem = ({ product, orderProduct }: { product: ProductDto, orderProduct?:OrderProduct }) => {
  const [opened, { toggle, close }] = useDisclosure();
  console.log(import.meta.env.CURRENCY);
  return (
    <>
      {opened && (
        <Modal
          opened={opened}
        title={product.name}
          onClose={() => toggle()}
          size={"md"}
         classNames={{close:"bg-slate-800 text-white rounded-full"}}
        >
          {" "}
          <PlateItemPoppup orderProduct={orderProduct} open={opened} close={close} product={product} />
        </Modal>
      )}

      <Card
     
       
     key={"product-"+ product.id}
        className={clsx(
          "bg-table flex  p-1  md:p-3 border-b md:border-none group  sm:ring-1  ring-slate-300/60  rounded-none sm:rounded-md  border-gray-400/40 bg-[#f5f8fc58] h-full   duration-500  "
        )}
      >


        <Group className="w-full grid grid-cols-12  grow pb-2 lg:pb-0 md:border-b-none  lg:rounded-md ">
          <div className="h-[100px] xs:h-[100px] md:col-span-4   lg:h-[120px] col-span-4  overflow-hidden rounded-md ring-1 content-center box-border ring-gray-300/40  ">
            <Image
              className="   h-full w-auto transform transition-transform duration-500 ease-in-out group-hover:scale-125 mx-auto"
              src={product.file![0].path}
              alt={product.description}
            />
          </div>
          <div className="h-full flex grow flex-col md:col-span-8   col-span-8 ">
          <div className="flex justify-between">
          <Text lineClamp={1} className="font-bold break-words  md:text-xl capitalize">{product.name} </Text>
{orderProduct&&<Pill  color="primary" className="ring-1 ring-primary-400" radius={8}>x{orderProduct?.quantity}</Pill>}
          </div>
            <div className=" text-gray-600 ">
              <Text lineClamp={3} className="text-xs  md:text-base">{product.description}</Text>
            </div>
            <Space flex={3}/>
            <Group gap={0} justify="space-between grow bg-red-500 w-full">
            <Text
              className="text-lg  font-serif  md:mr-3"
              c={"primary.5"}
              p={2}
              lineClamp={1}
            >
              {reductionPrice({
                price: product.price!,
                reduction: product.reduction!,
              })}
            </Text>
            <div className="hidden  md:block">
              {product.reduction! > 0 && (
                <Text
                  fw={900}
                  className="text-xs md:text-base font-serif  mr-3 line-through decoration-slice text-gray-600"
                >
                  {product.price}
                  {import.meta.env.VITE_REACT_CURRENCY}
                </Text>
              )}
            </div>

            <Space flex={2} />
            <ProtectedAction action={toggle}>
              <ActionIcon
                p={8}
                color={"secondary"}
               
                className="rounded-full size-6 "
              >
                <div className="flex items-center">
                  <PlusIcon className="md:size-6  size-4" />
                </div>
              </ActionIcon>
            </ProtectedAction>
          </Group>
          </div>
        </Group>

      
      </Card>
    </>
  );
};
