import { Link } from "react-router-dom"
import { useGetBannerQuery } from "../../../core/features/banner.slice"
import { TablePagination } from "../../components/table_pagination"
import { PathRouter } from "../../router/path.route"
import { formatDate } from "../../utils/date_format"
import { DeleteBanner } from "./widgets/delete_banner"

export const BannerList = () => {
    const {data, isSuccess, isLoading, isError , error}=useGetBannerQuery('')
  return (
    <TablePagination isError={isError} isSuccess={isSuccess} isLoading={isLoading} error={error} createPath={`/${PathRouter.banner}/${PathRouter.create}`}  title="Annonces" th={['Titre', 'Description','type', 'A Partir de ', 'date expiration', '']} trs={<>
    {data?.data.map(e=><tr key={e.id+'_tr'}>
        <td>
            <div className="flex items-center gap-3">
            <img title="logo" className="h-8 rounded-md" src={e.imageUrl}/>
          <span>  {e.title}</span>
            </div>
          </td>
        <td>{e.description}</td>
        <td>{e.type}</td>
        <td>{formatDate(e.start!)}</td>
        <td>{formatDate(e.end!)}</td>
        <td className="last_td_container">
          <div className="flex  justify-end">
        <DeleteBanner id={e.id!}/>
            <Link to={`/${PathRouter.banner}/${PathRouter.details.replace(':id', `${e.id}`)}`} className="accept last_td">Details</Link>
            <Link to={`/${PathRouter.banner}/${PathRouter.edit.replace(':id', `${e.id}`)}`} className="default last_td">Modifier</Link>
            </div>
        </td>
    </tr>)}
    </>}/>
  )
}
