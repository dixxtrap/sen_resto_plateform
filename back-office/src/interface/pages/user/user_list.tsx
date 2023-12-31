import React from 'react'
import { TablePagination } from '../../components/table_pagination'
import { useGetUserQuery } from '../../../core/features/auth.slice'
import { Link } from 'react-router-dom'
import { Status } from '../../components/status'

export const UserList = () => {
        const {data:users=[]}=useGetUserQuery("")
  return (
    <TablePagination 
    title='Agents' 
    subtitle='Liste des Agents'
    createPath='/user/create'
    th={["Nom & Prenom", "Role", "Adresse", "Téléphone","status", ""]}
    trs={
        <>
                 {users.map((user) => (
                        <tr key={user.email+"_"+user.id}>
                          <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm sm:pl-0">
                            <div className="flex items-center">
                             
                             
{/* <ImgPreview  name={`img_${user.id}`} img={ user.company.short_name=="SR" ? user.profile!:user.company.profile!}/> */}
                            
                             <div className='flex flex-col'>
                             <div className="font-medium  text-gray-900">{user.firstname} {user.lastname}</div>
                                
                             </div>
                                
                            
                            </div>
                          </td>
                          <td className="">{user!.role!.name} {user!.role!.scope}</td>
      
                        
                        
                          <td className="">{user.address}-{user.city}</td>
                          <td className="">{user.phone}</td>
                          <td className="">
                       <Status status={ user.status!} inactiveText='Inactif' activeText='Actif' />
                          </td>
                          <td className="last_td_container">
                            <Link to={`/user/details/${user.id}`}className="last_td">
                              Details<span className="sr-only"> {user.phone}</span>
                            </Link>
                            <Link to={`/user/edit/${user.id}`} className="last_td">
                              Modifier<span className="sr-only"> {user.phone}</span>
                            </Link>
                          </td>
                        </tr>
                      ))}
                      </>}
       
    />
  )
}
