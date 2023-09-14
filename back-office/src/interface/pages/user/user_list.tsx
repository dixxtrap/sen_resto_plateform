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
                                <div className="mt-1 text-gray-500 leading-3 text-xs">{user.email}</div>
                             </div>
                                
                            
                            </div>
                          </td>
                          <td className="whitespace-nowrap  py-3 text-sm text-gray-500">{user!.role!.name} {user!.role!.scope}</td>
      
                        
                        
                          <td className="whitespace-nowrap  py-3 text-sm text-gray-500">{user.address}-{user.city}</td>
                          <td className="whitespace-nowrap  py-3 text-sm text-gray-500">{user.phone}</td>
                          <td className="whitespace-nowrap  py-3 text-sm text-gray-500">
                       <Status status={ user.status!} inactiveText='Inactif' activeText='Actif' />
                          </td>
                          <td className="relative whitespace-nowrap py-3 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            <Link to={`/user/details/${user.id}`} className="text-indigo-600 px-2 hover:text-indigo-900">
                              Details<span className="sr-only"> {user.phone}</span>
                            </Link>
                            <Link to={`/user/edit/${user.id}`} className="text-indigo-600 px-2 hover:text-indigo-900">
                              Modifier<span className="sr-only"> {user.phone}</span>
                            </Link>
                          </td>
                        </tr>
                      ))}
                      </>}
       
    />
  )
}
