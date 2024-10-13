import {
  Badge,
  Pill,
  Table,
} from "@mantine/core";
import { orderApi } from "../../../core/features/order.slice";
import { TablePagination } from "../../components/table/table";
import { OrderStatus, statusMessages } from "../../../core/models/order.dto";
import {
  TableActionItemDetails,
  TableActionItemEdit,
} from "../../components/table/action_item";
import { getSocket } from "../../../core/features/get_socket";
import { ChangeStatus } from "./widget/chane_status";

export const OrderList = () => {
  const { data: order, ...state } = orderApi.useGetOrdersQuery("");
 
  getSocket()?.on("messageFrom", async () => {
   handleRefetch()
  });
  const handleRefetch = () => {
   if(state.isSuccess && !state.isLoading){
    console.log("===============refetch================")
    state.refetch()}
  };
 

  return (
    <>
    <div className="hidden md:inline-block">
    <TablePagination
        {...state}
        isPaginated
        th={["customer","Téléphone", "Produit", "status", ""]}
        trs={
          <>
            {order?.data.map((e) => (
              <Table.Tr key={e.id}>
                <Table.Td>
                  {e.customer?.firstname} {e.customer?.lastname}
                </Table.Td>
                <Table.Td>
                 
                  {e.customer?.phone}
                </Table.Td>
                <Table.Td>
                  <div className="flex gap-3">
                    {e.products?.slice(0, 2)?.map((p) => (
                      <Pill key={`pill_${p.productHistory?.id}`}>{p.productHistory?.product?.name}</Pill>
                    ))}
                    {e.products?.length! > 2 && (
                      <Badge>+ {e.products?.length! - 2}</Badge>
                    )}
                  </div>
                </Table.Td>
                <Table.Td>
                  <span className={e.status}>{statusMessages[e.status]}</span>
                </Table.Td>

                <Table.Td className="">
                {e.status=== OrderStatus.Active&&<ChangeStatus id={e.id} status={OrderStatus.Cancelled} title={"preparation"} variant={"danger"} message={""} />}

               { e.status=== OrderStatus.Active&&<ChangeStatus id={e.id} status={OrderStatus.Preparing} title={"preparation"} variant={"success"} message={""} />}
               { e.status=== OrderStatus.Preparing&&<ChangeStatus id={e.id} status={OrderStatus.ReadyForDelivery} title={"Fin de preparation"} variant={"success"} message={""} />}
              
              
                  <TableActionItemDetails
                    label="voir details"
                    path={`/order/details/${e.id}`}
                  />
                  <TableActionItemEdit
                    label="voir details"
                    path={`/order/edit/${e.id}`}
                  />
                </Table.Td>
              </Table.Tr>
            ))}
          </>
        }
      />
    </div>
    <div className="md:hidden">
    <TablePagination
        {...state}
        isPaginated
        th={["customer", ""]}
        trs={
          <>
            {order?.data.map((e) => (
              <Table.Tr key={e.id}>
                <Table.Td>
                  <div className="flex flex-col">
                  <span>
                  {e.customer?.firstname} {e.customer?.lastname}

                  </span>
                 
                  </div>
                </Table.Td>
               

                <Table.Td className="">
                {e.status=== OrderStatus.Active&&<ChangeStatus id={e.id} status={OrderStatus.Cancelled} title={"preparation"} variant={"danger"} message={""} />}

               { e.status=== OrderStatus.Active&&<ChangeStatus id={e.id} status={OrderStatus.Preparing} title={"preparation"} variant={"success"} message={""} />}
               { e.status=== OrderStatus.Preparing&&<ChangeStatus id={e.id} status={OrderStatus.ReadyForDelivery} title={"Fin de preparation"} variant={"success"} message={""} />}
              
              
                  <TableActionItemDetails
                    label="voir details"
                    path={`/order/details/${e.id}`}
                  />
                  <TableActionItemEdit
                    label="voir details"
                    path={`/order/edit/${e.id}`}
                  />
                </Table.Td>
              </Table.Tr>
            ))}
          </>
        }
      />
    </div>
    
    </>
  );
};
