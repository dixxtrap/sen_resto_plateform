import {  Image, TableTd, TableTr } from "@mantine/core"
import { TablePagination } from "../../components/table/table"
import { EstablishmentTypeCreate } from "./establishment_type_create"
import { establishmentTypeApi } from '../../../core/features/establishment_type.slice';
import { Status } from "../../components/status";
import { EstablishmentTypeEdit } from "./establishment_type_edit";

export const EstablishmentTypeList = () => {
    const {data:result, ...state}=establishmentTypeApi.useGetAllQuery('')
  return (
   <TablePagination  th={['name','description','status','']}  {...state} creaBtn={<EstablishmentTypeCreate/>} title="Types d Etablissement" trs={<>{result?.data.map(e=><TableTr>
    <TableTd>
        <div className="flex  items-center gap-2 ">
            <div>
            <Image src={e.imagePath!} className="h-8 max-w-9 rounded-md" />
            </div>
           
       <span> {e.name}</span>
        </div>
    </TableTd>
    <TableTd>{e.description}</TableTd>
    <TableTd>
        <Status status={e.isActive!}/>
    </TableTd>
    <TableTd>
    <EstablishmentTypeEdit body={e}/>
    </TableTd>
   </TableTr>)}</>}>

   </TablePagination>
  )
}
