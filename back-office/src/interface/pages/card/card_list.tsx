import { useGetCardQuery } from "../../../core/features/card.slice"
import { TablePagination } from "../../components/table_pagination"
import { formatDate } from "../../utils/date_format"


export const CardList = () => {
  const {data, isLoading, isSuccess, isError, error}=useGetCardQuery('')
  console.log(data)
  return (
        <>
  
   
    {/* {isSuccess&& <Alert type="succeedded" isOpen={isSuccess}/>} */}
    <TablePagination   isError={isError} isSuccess={isSuccess} isLoading={isLoading} error={error} title="Cartes" createPath="/card/create" createTitle="Ajouter des cartes" th={["Num Serie", "Num Carte","uid","Date Creation", 'status',""]} trs={<>
   
    {data?.data?.map(e=><tr>
      <td>{e.serial}</td>
      <td>{e.pan}</td>
      <td>{e.uid}</td>
      <td>{formatDate(e.details?.createdAt!)}</td>
      <td ><span className={e.status?.replace(/\s/g, '')}>{e.status}</span></td>

    </tr>)}
    </>}/>
    </>
  )
}
