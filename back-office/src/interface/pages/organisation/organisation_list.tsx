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
                    <td className="">
                      <div className="flex items-center">
                        <div className="  flex-shrink-0 ">
                          {/* <ImgPreview name={`Prile_${company?.profile?.id}`} className='bg-blue-400 h-11' img={company.profile!}/> */}
                         <Img  hasImg={company?.profile?.path!=='' &&company?.profile?.path!==null && company?.profile!=null} icon={<BuildingOffice2Icon  className='h-5  text-indigo-500 mr-2'/>} className='h-7 mr-2  aspect-square' imgId={company.profile?.id} />
                        </div>
                       
                          <div className="font-medium ">{company.name}</div>
                          {/* <div className="mt-1 text-gray-500">{company.email}</div> */}
                      
                      </div>
                    </td>
                    <td className="">{company.email}</td>

                  
                  
                    <td className="">{company.address}/{company.city}</td>
                    <td className="">{company.phone}</td>
                    <td className="">
                    <Status status={ company.isActive!} inactiveText='Inactif' activeText='Actif' />
                      
                     
                    </td>
                    <td className="last_td_container">
                      <Link to={`/organisation/details/${company.id}`} className="last_td">
                        Details<span className="sr-only">, {company.phone}</span>
                      </Link>
                      <Link to={`/organisation/edit/${company.id}`} className="last_td">
                        Modifier<span className="sr-only">, {company.phone}</span>
                      </Link>
                    </td>
                  </tr>
                ))}
          </>
       }/>
  )
}
