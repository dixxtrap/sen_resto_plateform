import { useGetCompanyQuery } from '../../../core/features/company.slice'
import { TablePagination } from '../../components/table/table';
import { Status } from '../../components/status';
import { Table, Image } from '@mantine/core';
import { TableActionItemDetails, TableActionItemEdit } from '../../components/table/action_item';
// import { BuildingOfficeIcon } from '@heroicons/react/24/outline';
export const OrganisationList = () => {
        const companies=useGetCompanyQuery("");
  return (
       <TablePagination 
       {...companies}
       th={["Nom", "Email", "Addresse", "Phone","Solde","Type", "Status", ""]}
       createPath='/organisation/create'
       title='Organisation' subtitle='List des oraganisations  et status ' trs={
          <>
           {companies.data?.data.map((company) => (
                  <Table.Tr key={company.id!+company.name!}>
                    <Table.Td className="">
                      <div className="flex items-center">
                        <div className=" pl-2 flex-shrink-0  w-16 mr-2 content-center flex  justify-start ">
                         
                        <Image src={`${company.imagePath!}`} className='h-8 rounded-md' alt=""  />
                        </div>
                       
                          <div className="font-medium ">{company.name}</div>
                          {/* <div className="mt-1 text-gray-500">{company.email}</div> */}
                      
                      </div>
                    </Table.Td>
                    <Table.Td className="">{company.email}</Table.Td>

                  
                  
                    <Table.Td className=""><span className=" max-w-52 text-ellipsis  overflow-clip">{company.address}</span></Table.Td>
                    <Table.Td className="">{company.phone}</Table.Td>
                    <Table.Td className="font-bold">{company.balance} Fcfa</Table.Td>
                    <Table.Td >{company.establishmentType?.name}</Table.Td>

                    <Table.Td className="">
                    <Status status={ company.isActive!} inactiveText='Inactif' activeText='Actif' />
                      
                     
                    </Table.Td>
                    <Table.Td className="last_td_container">
                    <TableActionItemDetails label='voir details' path={`/organisation/details/${company.id}`}/>
                    <TableActionItemEdit label='voir details' path={`/organisation/edit/${company.id}`}/>
                    </Table.Td>
                  </Table.Tr>
                ))}
          </>
       }/>
  )
}
