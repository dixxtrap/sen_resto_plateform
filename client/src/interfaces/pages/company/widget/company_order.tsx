import {
  ActionIcon,
  Button,
  ScrollAreaAutosize,
  Modal,
  Accordion,
} from "@mantine/core";
import { orderApi } from "../../../../cores/apis/order.slice";
import { CompanyOrderProductItem } from "./company_order_product_item";
import ShoppingBagIcon from "@heroicons/react/24/outline/ShoppingBagIcon";
import { useCounter, useDisclosure } from "@mantine/hooks";
import { CakeIcon, WalletIcon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import classes from "../styles/company_order.module.css";
import { useForm } from "@mantine/form";
import { Bars3BottomLeftIcon, PlusIcon } from "@heroicons/react/24/solid"; 
import { AddressForm } from "../../../components/form/address_form";

export const CompanyOrderMobile = ({ companyId }: { companyId: number }) => {
  const [opened, { toggle }] = useDisclosure();
  return (
    <>
      <Modal
        p={0}
        m={0}
        classNames={{
          content: "p-0 m-0",
          body: "p-0 m-0 pb-2",
          header: "px-2",
          root: "p-0 m-0 z-[20]",
        }}
        opened={opened}
        withCloseButton={false}
        onClose={close}
        closeOnClickOutside={true}
        closeOnEscape={true}
      >
        <div className="h-[75vh] flex flex-col">
          <CompanyOrder compnayId={companyId} />
        </div>
      </Modal>
      <div
        className={clsx(
          "fixed  md:hidden transition-transform  duration-700 right-3 z-[500] bottom-16 "
        )}
      >
        <ActionIcon
          radius={30}
          size={"xl"}
          color="black"
          onClick={toggle}
          className={clsx(
            "p-1.5 shadow-lg  bg-slate-900 shadow-slate-500/30",
            opened ? "" : ""
          )}
        >
          {opened ? <XMarkIcon /> : <ShoppingBagIcon />}
        </ActionIcon>
      </div>
    </>
  );
};
export const CompanyOrderWeb = ({ compnayId }: { compnayId: number }) => {
  return (
    <div className="flex flex-col mx-4  ring-1 ring-slate-200 bg-slate-200/10 rounded-md  h-[80vh] ">
      <CompanyOrder compnayId={compnayId} />
    </div>
  );
};
export const CompanyOrder = ({ compnayId }: { compnayId: number }) => {
  console.log("=================companyId==============", compnayId);
  const orders = orderApi.useGetBagQuery();
  const [current, { increment, decrement, set }] = useCounter(0, {
    min: 1,
    max: 3,
  });
  console.log(orders);
  const handleSubmit = () => {
    if (current !== 3) increment();
  };
  const form = useForm();
  return (
    <>
      <div className="p-3">
        <span className="text-2xl  font-bold">Vos Commandes {current}</span>
      </div>

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
                className="border-y grow "
              >
                <Accordion
                  defaultValue="1"
                  value={current.toString()}
                  pt={4}
                  variant="contained"
                  radius="xs"
                  classNames={{ chevron: classes.chevron , item:"border-x-0"}}
                  chevron={<PlusIcon className={classes.icon} />}
                >
                  <Accordion.Item className="border-x-0" onClick={() => set(1)} key={"1"} value={"1"}>
                    <Accordion.Control
                      icon={<CakeIcon className="size-5" />}
                      // disabled={item.value === "Bananas"}
                    >
                      {"Produits"}
                    </Accordion.Control>
                    <Accordion.Panel>
                      <div className="flex flex-col py-3 gap-4">
                        {e.products.map((p) => (
                          <CompanyOrderProductItem orderProduct={p} />
                        ))}
                      </div>
                    </Accordion.Panel>
                  </Accordion.Item>
                  <Accordion.Item
                    p={0}
                    onClick={() => set(2)}
                    key={"2"}
                    value={"2"}
                  >
                    <Accordion.Control
                      icon={<WalletIcon className="size-5" />}
                      // disabled={item.value === "Bananas"}
                    >
                      {"Details de payments"}
                    </Accordion.Control>
                    <Accordion.Panel p={0}>
                      <AddressForm form={form} />
                    </Accordion.Panel>
                  </Accordion.Item>
                  <Accordion.Item onClick={() => set(3)} key={"3"} value={"3"}>
                    <Accordion.Control
                      icon={<Bars3BottomLeftIcon className="size-5" />}
                      // disabled={item.value === "Bananas"}
                    >
                      {"Recap"}
                    </Accordion.Control>
                    <Accordion.Panel></Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
              </ScrollAreaAutosize>
              <div className="flex gap-3 px-3 pt-2">
               {current>1&& <Button onClick={decrement} fullWidth>
                  {" "}
                  Precedent
                </Button>}
                <Button onClick={handleSubmit} color={"secondary"} fullWidth>
                  {" "}
                  {current === 3 ? "Confirmer" : "suivant"}
                </Button>
              </div>
            </>
          ))
      ) : (
        <div className=" grow border-y "></div>
      )}
    </>
  );
};
