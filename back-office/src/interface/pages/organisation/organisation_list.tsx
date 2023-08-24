import { useGetCompanyQuery } from '../../../core/features/company.slice'
import { Img,  } from '../../components/image_updatable';
import {Link} from "react-router-dom";
import { TablePagination } from '../../components/table_pagination';
import { BuildingStorefrontIcon } from '@heroicons/react/24/outline';
export const OrganisationList = () => {
        const {data:companies=[]}=useGetCompanyQuery("");
  return (
       <TablePagination 
       th={["Nom", "Email", "Addresse", "Phone", "Status", ""]}
       createPath='/organisation/create'
       title='Organisation' subtitle='List des oraganisations  et status ' trs={
          <>
           {companies.map((company) => (
                  <tr key={company.email}>
                    <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm sm:pl-0">
                      <div className="flex items-center">
                        <div className="  flex-shrink-0 ">
                          {/* <ImgPreview name={`Prile_${company?.profile?.id}`} className='bg-blue-400 h-11' img={company.profile!}/> */}
                         <Img  hasImg={company?.profile?.path!=='' &&company?.profile?.path!==null && company?.profile!=null} icon={<BuildingStorefrontIcon  className='h-7'/>} className='h-8 aspect-square' imgId={company.profile?.id} />
                        </div>
                       
                          <div className="font-medium text-gray-900">{company.name}</div>
                          {/* <div className="mt-1 text-gray-500">{company.email}</div> */}
                      
                      </div>
                    </td>
                    <td className="whitespace-nowrap  py-3 text-sm text-gray-500">{company.email}</td>

                  
                  
                    <td className="whitespace-nowrap  py-3 text-sm text-gray-500">{company.city}</td>
                    <td className="whitespace-nowrap  py-3 text-sm text-gray-500">{company.phone}</td>
                    <td className="whitespace-nowrap  py-3 text-sm text-gray-500">
                      <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        Active
                      </span>
                    </td>
                    <td className="relative whitespace-nowrap py-3 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <Link to={`/organisation/edit/${company.id}`} className="text-indigo-600 px-2 hover:text-indigo-900">
                        Details<span className="sr-only">, {company.phone}</span>
                      </Link>
                      <Link to={`/organisation/details/${company.id}`} className="text-indigo-600 px-2 hover:text-indigo-900">
                        Edit<span className="sr-only">, {company.phone}</span>
                      </Link>
                    </td>
                  </tr>
                ))}
          </>
       }/>
  )
}
