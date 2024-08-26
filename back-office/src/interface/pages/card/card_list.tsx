import { Table } from "@mantine/core"
import { useGetCardQuery } from "../../../core/features/card.slice"
import { TablePagination } from "../../components/table/table"
import { formatDate } from "../../utils/date_format"


export const CardList = () => {
  const {data, isLoading, isSuccess, isError, error}=useGetCardQuery('')
  console.log(data)
  return (
        <>
  
   
    {/* {isSuccess&& <Alert type="succeedded" isOpen={isSuccess}/>} */}
    <TablePagination   isError={isError} isSuccess={isSuccess} isLoading={isLoading} error={error} title="Cartes" createPath="/card/create" createTitle="Ajouter des cartes" th={["Num Serie", "Num Carte","uid","Date Creation", 'status',""]} trs={<>
   
    {data?.data?.map(e=><Table.Tr>
      <Table.Td>{e.serial}</Table.Td>
      <Table.Td>{e.pan}</Table.Td>
      <Table.Td>{e.uid}</Table.Td>
      <Table.Td>{formatDate(e.details?.createdAt!)}</Table.Td>
      <Table.Td ><span className={e.status?.replace(/\s/g, '')}>{e.status}</span></Table.Td>

    </Table.Tr>)}
    </>}/>
    </>
  )
}
