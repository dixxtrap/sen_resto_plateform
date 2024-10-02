import {
  SimpleGrid,
  Image,
  Text,
  ActionIcon,
  Button,
  ScrollAreaAutosize,
} from "@mantine/core";
import { orderApi } from "../../../../cores/apis/order.slice";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";

export const CompanyOrder = ({ compnayId }: { compnayId: number }) => {
  console.log("=================companyId==============", compnayId);
  const orders = orderApi.useGetBagQuery();
  console.log(orders);
  return (
    <div className="flex flex-col  ring-1 ml-4 ring-slate-200 p-1  bg-slate-200/30 rounded-md  min-h-[500px] ">
      <div className="py-1">
        <span className="text-2xl font-bold">Vos Commandes</span>
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
                className="border-y grow"
              >
                <div className="flex flex-col py-3 gap-4">
                  {e.products.map((p) => (
                    <SimpleGrid p={1} cols={12}>
                      <div className="h-20 ring-1 ring-slate-300 rounded-md col-span-4">
                        <Image
                          className="h-full rounded-md"
                          src={p.productHistory?.product?.file![0].path}
                        />
                      </div>
                      <div className="grow col-span-8 ">
                        <div className="flex flex-col w-full">
                          <Text
                            lineClamp={1}
                            className="break-words font-bold line-clamp-1"
                          >
                            {p.productHistory.product.name}
                          </Text>
                          <Text
                            fw={400}
                            lineClamp={1}
                            className="text-sm md:text-base  text-gray-600"
                          >
                            {p.productHistory.product.description}
                          </Text>
                        </div>
                        <div className="flex justify-end  w-full items-center gap-2">
                          <ActionIcon radius={100}>
                            <MinusIcon />
                          </ActionIcon>
                          <span className="font-bold">{p.quantity}</span>
                          <ActionIcon radius={100}>
                            <PlusIcon />
                          </ActionIcon>
                        </div>
                      </div>
                    </SimpleGrid>
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
    </div>
  );
};
