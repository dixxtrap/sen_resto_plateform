import { Pill, Table } from "@mantine/core"
import { orderApi } from "../../../core/features/order.slice"
import { TablePagination } from "../../components/table/table"
import {  statusMessages } from "../../../core/models/order.dto"
import { TableActionItemDetails, TableActionItemEdit } from "../../components/table/action_item"

export const OrderList = () => {
  const order=orderApi.useGetOrdersQuery('')
  return (

   
  <TablePagination {...order} th={['customer','Produit', 'status','']} trs={<>
  {
    order.data?.data.map(e=>(<Table.Tr>
      <Table.Td>{e.customer?.firstname} {e.customer?.lastname}/{e.customer?.phone}</Table.Td>

      <Table.Td><div className="flex gap-3">{e.products?.map(p=>(<Pill>{p.productHistory?.product?.name}</Pill>))}</div></Table.Td>
      <Table.Td><span className={e.status}>{statusMessages[e.status]}</span></Table.Td>
  
      <Table.Td className="">
      <TableActionItemDetails label='voir details' path={`/order/details/${e.id}`}/>
      <TableActionItemEdit label='voir details' path={`/order/edit/${e.id}`}/>
      </Table.Td>
    </Table.Tr>))
  }
  </>}/>
  )
}
