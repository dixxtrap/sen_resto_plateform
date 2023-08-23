import React from 'react'
import { TablePagination } from '../../components/table_pagination'
import { useGetUserQuery } from '../../../core/features/auth.slice'
import { Link } from 'react-router-dom'
import { Img } from '../../components/image_updatable'

export const UserList = () => {
        const {data:users=[]}=useGetUserQuery("")
  return (
    <TablePagination 
    title='Agents' 
    subtitle='Liste des Agents'
    th={["Nom & Prenom", "Email", "Adresse", "status", ""]}
    trs={
        <>
                 {users.map((user) => (
                        <tr key={user.email}>
                          <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm sm:pl-0">
                            <div className="flex items-center">
                             
                             
{/* <ImgPreview  name={`img_${user.id}`} img={ user.company.short_name=="SR" ? user.profile!:user.company.profile!}/> */}
                            
                             <div className='flex flex-col'>
                             <div className="font-medium text-base text-gray-900">{user.firstname} {user.lastname}</div>
                                <div className="mt-1 text-gray-500 leading-3 text-xs">{user.email}</div>
                             </div>
                                
                            
                            </div>
                          </td>
                          <td className="whitespace-nowrap  py-3 text-sm text-gray-500">{user.role.name} {user.role.scope}</td>
      
                        
                        
                          <td className="whitespace-nowrap  py-3 text-sm text-gray-500">{user.city}</td>
                          <td className="whitespace-nowrap  py-3 text-sm text-gray-500">{user.phone}</td>
                          <td className="whitespace-nowrap  py-3 text-sm text-gray-500">
                            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                              Active
                            </span>
                          </td>
                          <td className="relative whitespace-nowrap py-3 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            <Link to={`/organisation/edit/${user.id}`} className="text-indigo-600 px-2 hover:text-indigo-900">
                              Details<span className="sr-only">, {user.phone}</span>
                            </Link>
                            <Link to={`/organisation/details/${user.id}`} className="text-indigo-600 px-2 hover:text-indigo-900">
                              Edit<span className="sr-only">, {user.phone}</span>
                            </Link>
                          </td>
                        </tr>
                      ))}
                      </>}
       
    />
  )
}
