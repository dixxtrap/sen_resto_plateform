import { useGetCompanyQuery } from '../../../core/features/company.slice'
import { Img,  } from '../../components/image_updatable';
import {Link} from "react-router-dom";
import { TablePagination } from '../../components/table_pagination';
import { BuildingOffice2Icon } from '@heroicons/react/24/solid';
import { Status } from '../../components/status';
export const OrganisationList = () => {
        const {data:companies=[]}=useGetCompanyQuery("");
  return (
       <TablePagination 
       th={["Nom", "Email", "Addresse", "Phone", "Status", ""]}
       createPath='/organisation/create'
       title='Organisation' subtitle='List des oraganisations  et status ' trs={
          <>
           {companies.map((company) => (
                  <tr key={company.id!+company.name!}>
                    <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm sm:pl-0">
                      <div className="flex items-center">
                        <div className="  flex-shrink-0 ">
                          {/* <ImgPreview name={`Prile_${company?.profile?.id}`} className='bg-blue-400 h-11' img={company.profile!}/> */}
                         <Img  hasImg={company?.profile?.path!=='' &&company?.profile?.path!==null && company?.profile!=null} icon={<BuildingOffice2Icon  className='h-5  text-indigo-500 mr-2'/>} className='h-8 mr-2 aspect-square' imgId={company.profile?.id} />
                        </div>
                       
                          <div className="font-medium text-gray-900">{company.name}</div>
                          {/* <div className="mt-1 text-gray-500">{company.email}</div> */}
                      
                      </div>
                    </td>
                    <td className="whitespace-nowrap  py-3 text-sm text-gray-500">{company.email}</td>

                  
                  
                    <td className="whitespace-nowrap  py-3 text-sm text-gray-500">{company.address}/{company.city}</td>
                    <td className="whitespace-nowrap  py-3 text-sm text-gray-500">{company.phone}</td>
                    <td className="whitespace-nowrap  py-3 text-sm text-gray-500">
                    <Status status={ company.isActive!} inactiveText='Inactif' activeText='Actif' />
                      
                     
                    </td>
                    <td className="relative whitespace-nowrap py-3 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <Link to={`/organisation/edit/${company.id}`} className="text-indigo-600 px-2 hover:text-indigo-900">
                        Details<span className="sr-only">, {company.phone}</span>
                      </Link>
                      <Link to={`/organisation/details/${company.id}`} className="text-indigo-600 px-2 hover:text-indigo-900">
                        Modifier<span className="sr-only">, {company.phone}</span>
                      </Link>
                    </td>
                  </tr>
                ))}
          </>
       }/>
  )
}
