import { TablePagination } from '../../components/table_pagination'
import { useGetUserQuery } from '../../../core/features/auth.slice'
import { Link } from 'react-router-dom'
import { Status } from '../../components/status'

export const UserList = () => {
        const {data:users}=useGetUserQuery("")
  return (
    <div>
    <TablePagination 
    title='Agents' 
    subtitle='Liste des Agents'
    createPath='/user/create'
    th={["Nom & Prenom", "Role", "Adresse", "Téléphone","status", ""]}
    trs={
        <>
                 {users?.data.map((user) => (
                        <tr key={user.email+"_"+user.id}>
                          <td className="">
                            <div className="flex items-center">
                             
                             
{/* <ImgPreview  name={`img_${user.id}`} img={ user.company.short_name=="SR" ? user.profile!:user.company.profile!}/> */}
                            
                             <div className='flex flex-col'>
                             <div className="font-bold  ">{user.firstname!} {user.lastname!}</div>
                                
                             </div>
                                
                            
                            </div>
                          </td>
                          <td className="">{user!.role!.name??""}   </td>
      
                        
                        
                          <td className="">{user.address?.country!}-{user.address?.city}</td>
                          <td className="">{user.phone}</td>
                          <td className="">
                       <Status status={ user.isActive!} inactiveText='Inactif' activeText='Actif' />
                          </td>
                          <td className="last_td_container">
                            <Link to={`/user/details/${user.id}`}className="last_td accept">
                              Details<span className="sr-only"> {user.phone}</span>
                            </Link>
                            <Link to={`/user/edit/${user.id}`} className="last_td default">
                              Modifier<span className="sr-only"> {user.phone}</span>
                            </Link>
                          </td>
                        </tr>
                      ))}
                      </>}
       
    />
    </div>
  )
}
