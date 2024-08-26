import {   Table } from "@mantine/core"

import { TablePagination } from "../../components/table/table"
import { deliverApi } from "../../../core/features/deliver.slice"
import { TableActionItemDetails, TableActionItemEdit } from "../../components/table/action_item"

export const DeliverList = () => {
    const deliver=deliverApi.useGetQuery("")
    return (
     <TablePagination {...deliver} createPath="/deliver/create"  th={['Nom','Phone', 'Immatriculation','Adresse', '']} trs={<>
    {deliver.data?.data.map(e=><Table.Tr>
      <Table.Td>{e.firstname} {e.lastname}</Table.Td>
      <Table.Td>{e.phone}</Table.Td>
      <Table.Td>{e.email}</Table.Td>
      <Table.Td>{e.address}</Table.Td>
      <Table.Td>
       
      <TableActionItemDetails label='voir details' path={`/deliver/details/${e.id}`}/>
      <TableActionItemEdit label='voir details' path={`/deliver/edit/${e.id}`}/>
      </Table.Td>
    </Table.Tr>)}
     </>}>

     </TablePagination>
    )
  }