import {
  ActionIcon,
  Button,
  ScrollAreaAutosize,
  Modal,
} from "@mantine/core";
import { orderApi } from "../../../../cores/apis/order.slice";
import { CompanyOrderProductItem } from "./company_order_product_item";
import ShoppingBagIcon from "@heroicons/react/24/outline/ShoppingBagIcon";
import { useDisclosure } from "@mantine/hooks";
import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export const CompanyOrderMobile = ({ companyId }: { companyId: number }) => {
  const [opened, {toggle}]=useDisclosure();
  return (
    <>
      <Modal p={0} m={0} opened={opened}withCloseButton={false} onClose={close}>
        <div className="h-[75vh] flex flex-col">
        <CompanyOrder compnayId={companyId}/>

        </div>
      </Modal>
      <div className={clsx("fixed  md:hidden transition-transform  duration-700 right-3 z-[1000] bottom-16 ",)}>
        <ActionIcon
          radius={30}
          size={"xl"}
          color="black"
          onClick={toggle}
          className={clsx("p-1.5 shadow-lg  bg-slate-900 shadow-slate-500/30", opened?"":"")}
        >
          {opened?<XMarkIcon/>:<ShoppingBagIcon/>}
        </ActionIcon>
      </div>
    </>
  );
};
export const CompanyOrderWeb=({ compnayId }: { compnayId: number })=>{
  return (<div className="flex flex-col ml-4  ring-1 ring-slate-200 p-1  bg-slate-200/30 rounded-md  h-[80vh] ">
     <CompanyOrder compnayId={compnayId}/>
     </div>
     )
}
export const CompanyOrder = ({ compnayId }: { compnayId: number }) => {
  console.log("=================companyId==============", compnayId);
  const orders = orderApi.useGetBagQuery();
  console.log(orders);
  return (
    <>
        <span className="text-2xl font-bold">Vos Commandes</span>
      
      {orders.isSuccess ? (
        orders.data.data
          .filter((e) => e.partnerId == compnayId)
          .map((e) => (
            <>
              <ScrollAreaAutosize
                scrollbarSize={2}
                offsetScrollbars={false}
                my={0}
                p={0}
                className="border-y grow"
              >
                <div className="flex flex-col py-3 gap-4">
                  {e.products.map((p) => (
                    <CompanyOrderProductItem orderProduct={p} />
                  ))}
                </div>
              </ScrollAreaAutosize>
              <div className="">
                <Button fullWidth> Confirme</Button>
              </div>
            </>
          ))
      ) : (
        <div className=" grow border-y "></div>
      )}
    </>
  );
};
