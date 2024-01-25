import { useGetCompanyQuery } from '../../../core/features/company.slice'
import {Link} from "react-router-dom";
import { TablePagination } from '../../components/table_pagination';
import { BuildingOfficeIcon } from '@heroicons/react/24/solid';
import { Status } from '../../components/status';
// import { BuildingOfficeIcon } from '@heroicons/react/24/outline';
export const OrganisationList = () => {
        const {data:companies=[]}=useGetCompanyQuery("");
  return (
       <TablePagination 
       th={["Nom", "Email", "Addresse", "Phone","Solde", "Status", ""]}
       createPath='/organisation/create'
       title='Organisation' subtitle='List des oraganisations  et status ' trs={
          <>
           {companies.map((company) => (
                  <tr key={company.id!+company.name!}>
                    <td className="">
                      <div className="flex items-center">
                        <div className="  flex-shrink-0  w-16 mr-2 content-center flex  justify-center ">
                          {/* <ImgPreview name={`Prile_${company?.profile?.id}`} className='bg-blue-400 h-11' img={company.profile!}/> */}
                          {  company.imagePath? <img src={`/v1/${company.imagePath!}`} className='h-8 rounded-md' alt=""  />:<BuildingOfficeIcon className='h-8 p-1 text-primary-500 bg-secondary-500/20 ring-2  ring-secondary-500/80 rounded-md'/>}
                        </div>
                       
                          <div className="font-medium ">{company.name}</div>
                          {/* <div className="mt-1 text-gray-500">{company.email}</div> */}
                      
                      </div>
                    </td>
                    <td className="">{company.email}</td>

                  
                  
                    <td className="">{company.address?.streetAddress}/{company.address?.city}</td>
                    <td className="">{company.phone}</td>
                    <td className="font-bold">{company.balance} Fcfa</td>
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
