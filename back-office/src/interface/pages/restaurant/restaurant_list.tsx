import React from 'react'
import { useGetResttaurantQuery } from '../../../core/features/restaurant.slice'
import { TablePagination } from '../../components/table_pagination'
import { Img } from '../../components/image_updatable'
import { Link } from 'react-router-dom'
import { ImgPreview } from '../../components/Img_preview'

export const RestaurantList = () => {
        const {data:restaurants=[]}=useGetResttaurantQuery("")
  return (
    <div>
        <TablePagination 
        title='Restaurant'
        createPath='/restaurant/create'
        subtitle='Liste des Restaurants'
        th={["Nom", "Email","Adresse" ,"Téléphone","Status", ""]}
        trs={
        <>
                 {restaurants.map((restaurant) => (
                        <tr key={restaurant.email}>
                          <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm sm:pl-0">
                            <div className="flex items-center">
                             
                             
                               <Img hasImg={true} className='w-10 rounded-md mr-3 ' imgId={restaurant.company.short_name=="SR" ? restaurant.profile?.id : restaurant.company.profile?.id} />
{/* <ImgPreview  name={`img_${restaurant.id}`} img={ restaurant.company.short_name=="SR" ? restaurant.profile!:restaurant.company.profile!}/> */}
                            
                             <div className='flex flex-col'>
                             <div className="font-medium text-base text-gray-900">{restaurant.name}</div>
                                <div className="mt-1 text-gray-500 leading-3 text-xs">{restaurant.company.name}</div>
                             </div>
                                
                            
                            </div>
                          </td>
                          <td className="whitespace-nowrap  py-3 text-sm text-gray-500">{restaurant.email}</td>
      
                        
                        
                          <td className="whitespace-nowrap  py-3 text-sm text-gray-500">{restaurant.city}</td>
                          <td className="whitespace-nowrap  py-3 text-sm text-gray-500">{restaurant.phone}</td>
                          <td className="whitespace-nowrap  py-3 text-sm text-gray-500">
                            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                              Active
                            </span>
                          </td>
                          <td className="relative whitespace-nowrap py-3 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            <Link to={`/organisation/edit/${restaurant.id}`} className="text-indigo-600 px-2 hover:text-indigo-900">
                              Details<span className="sr-only">, {restaurant.phone}</span>
                            </Link>
                            <Link to={`/organisation/details/${restaurant.id}`} className="text-indigo-600 px-2 hover:text-indigo-900">
                              Edit<span className="sr-only">, {restaurant.phone}</span>
                            </Link>
                          </td>
                        </tr>
                      ))}
                      </>}
        />
    </div>
  )
}
