import BuildingOfficeIcon from "@heroicons/react/24/outline/BuildingOfficeIcon";
import { useGetCoorporateQuery } from "../../../core/features/coorporate.slice";
import { Status } from "../../components/status";
import { TablePagination } from "../../components/table/table";

import { PathRouter } from "../../router/path.route";
import { TextConstant } from "../../../core/data/textConstant";
import { Table } from "@mantine/core";
import { TableActionItemDetails, TableActionItemEdit } from "../../components/table/action_item";


export const CoorporateList = () => {
    const {data:companies, isError, error , isSuccess,  isLoading}=useGetCoorporateQuery("");
   const   path= `/${PathRouter.coorporate}`;
    return (
         <TablePagination 
         isError={isError} isSuccess={isSuccess} isLoading={isLoading} error={error}
         th={["Nom", "Email", "Addresse", "Phone","Solde", "Status", ""]}
         createPath={`${path}/${PathRouter.create}`}
         title={TextConstant.coorporateStr} subtitle='List des oraganisations  et status ' trs={
            <>
            
             {companies?.data?.map((company) => (
                    <Table.Tr key={company.id!+company.name!}>
                      <Table.Td className="">
                        <div className="flex items-center">
                          <div className="  flex-shrink-0  w-16 mr-2 content-center flex  justify-start ">
                            {/* <ImgPreview name={`Prile_${company?.profile?.id}`} className='bg-blue-400 h-11' img={company.profile!}/> */}
                            {companies.imagePath}
                            {  company.imagePath? <img src={`${company.imagePath!}`} className='h-8 rounded-md' alt=""  />:<BuildingOfficeIcon className='h-8 p-1 text-primary-500 bg-secondary-500/20 ring-2  ring-secondary-500/80 rounded-md'/>}
                          </div>
                            <div className="font-medium ">{company.name}</div>
                            {/* <div className="mt-1 text-gray-500">{company.email}</div> */} 
                        </div>
                      </Table.Td>
                      <Table.Td className="">{company.email}</Table.Td>
                      <Table.Td className="">{company.address}</Table.Td>
                      <Table.Td className="">{company.phone}</Table.Td>
                      <Table.Td className="font-bold">{company.balance} Fcfa</Table.Td>
                      <Table.Td className="">
                      <Status status={ company.isActive!} inactiveText='Inactif' activeText='Actif' />
                      </Table.Td>
                      <Table.Td className="last_td_container">
                      <TableActionItemDetails label='voir details' path={`/coorporate/details/${company.id}`}/>
                          <TableActionItemEdit label='voir details' path={`/coorporate/edit/${company.id}`}/>
                            
                      </Table.Td>
                    </Table.Tr>
                  ))}
            </>
         }/>
    )
}
