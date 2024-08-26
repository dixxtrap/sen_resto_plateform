import { useGetBannerQuery } from "../../../core/features/banner.slice"
import { TablePagination } from "../../components/table/table"
import { PathRouter } from "../../router/path.route"
import { formatDate } from "../../utils/date_format"
import { DeleteBanner } from "./widgets/delete_banner"
import { Table } from "@mantine/core"
import { TableActionItemDetails, TableActionItemEdit } from "../../components/table/action_item"

export const BannerList = () => {
    const {data, isSuccess, isLoading, isError , error}=useGetBannerQuery('')
   
  return (
    <TablePagination isError={isError} isSuccess={isSuccess} isLoading={isLoading} error={error} createPath={`/${PathRouter.banner}/${PathRouter.create}`}  title="Annonces" th={['Titre', 'Description','type', 'A Partir de ', 'date expiration', '']} trs={<>
    {data?.data.map(e=><Table.Tr key={e.id+'_tr'}>
        <Table.Td>
            <div className="flex items-center gap-3">
            <img title="logo" className="h-8 rounded-md" src={e.imageUrl}/>
          <span>  {e.title}</span>
            </div>
          </Table.Td>
        <Table.Td>{e.description}</Table.Td>
        <Table.Td>{e.type}</Table.Td>
        <Table.Td>{formatDate(e.start!)}</Table.Td>
        <Table.Td>{formatDate(e.end!)}</Table.Td>
        <Table.Td className="last_td_container">
          <div className="flex  justify-end">
        <DeleteBanner id={e.id!}/>
        <TableActionItemDetails label='voir details' path={`/banner/details/${e.id}`}/>
                          <TableActionItemEdit label='voir details' path={`/banner/edit/${e.id}`}/>
                            
            </div>
        </Table.Td>
    </Table.Tr>)}
    </>}/>
  )
}
