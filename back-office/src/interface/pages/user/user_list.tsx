import { TablePagination } from '../../components/table/table'
import { useGetUserQuery } from '../../../core/features/auth.slice'
import { Status } from '../../components/status'
import { Table } from '@mantine/core'
import { TableActionItemDetails, TableActionItemEdit } from '../../components/table/action_item'

export const UserList = () => {
        const users=useGetUserQuery("")
  return (
    <div>
    <TablePagination 
    {...users}
    title='Agents' 
    subtitle='Liste des Agents'
    createPath='/user/create'
    th={["Nom & Prenom", "Role", "Adresse", "Téléphone","status", ""]}
    trs={
        <>
                 {users.data?.data.map((user) => (
                        <Table.Tr key={user.email+"_"+user.id}>
                          <Table.Td className="">
                            <div className="flex items-center">
                             
                             
{/* <ImgPreview  name={`img_${user.id}`} img={ user.company.short_name=="SR" ? user.profile!:user.company.profile!}/> */}
                            
                             <div className='flex flex-col'>
                             <div className="font-bold  ">{user.firstname!} {user.lastname!}</div>
                                
                             </div>
                                
                            
                            </div>
                          </Table.Td>
                          <Table.Td className="">{user!.role!.name??""}   </Table.Td>
      
                        
                        
                          <Table.Td className="">{user.address?.country!}-{user.address?.city}</Table.Td>
                          <Table.Td className="">{user.phone}</Table.Td>
                          <Table.Td className="">
                       <Status status={ user.isActive!} inactiveText='Inactif' activeText='Actif' />
                          </Table.Td>
                          <Table.Td className="last_td_container">
                          <TableActionItemDetails label='voir details' path={`/user/details/${user.id}`}/>
                          <TableActionItemEdit label='voir details' path={`/user/edit/${user.id}`}/>
                            
                           
                          </Table.Td>
                        </Table.Tr>
                      ))}
                      </>}
       
    />
    </div>
  )
}
