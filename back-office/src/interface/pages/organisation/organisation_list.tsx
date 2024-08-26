import { useGetCompanyQuery } from '../../../core/features/company.slice'
import { TablePagination } from '../../components/table/table';
import { BuildingOfficeIcon } from '@heroicons/react/24/solid';
import { Status } from '../../components/status';
import { Table } from '@mantine/core';
import { TableActionItemDetails, TableActionItemEdit } from '../../components/table/action_item';
// import { BuildingOfficeIcon } from '@heroicons/react/24/outline';
export const OrganisationList = () => {
        const companies=useGetCompanyQuery("");
  return (
       <TablePagination 
       {...companies}
       th={["Nom", "Email", "Addresse", "Phone","Solde", "Status", ""]}
       createPath='/organisation/create'
       title='Organisation' subtitle='List des oraganisations  et status ' trs={
          <>
           {companies.data?.data.map((company) => (
                  <Table.Tr key={company.id!+company.name!}>
                    <Table.Td className="">
                      <div className="flex items-center">
                        <div className=" pl-2 flex-shrink-0  w-16 mr-2 content-center flex  justify-start ">
                          {/* <ImgPreview name={`Prile_${company?.profile?.id}`} className='bg-blue-400 h-11' img={company.profile!}/> */}
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
                    <TableActionItemDetails label='voir details' path={`/company/details/${company.id}`}/>
                    <TableActionItemEdit label='voir details' path={`/company/edit/${company.id}`}/>
                    </Table.Td>
                  </Table.Tr>
                ))}
          </>
       }/>
  )
}
