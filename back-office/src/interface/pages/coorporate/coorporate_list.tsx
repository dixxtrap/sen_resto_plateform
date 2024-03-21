import BuildingOfficeIcon from "@heroicons/react/24/outline/BuildingOfficeIcon";
import { useGetCoorporateQuery } from "../../../core/features/coorporate.slice";
import { Status } from "../../components/status";
import { TablePagination } from "../../components/table_pagination";
import { Link,  } from "react-router-dom";
import { PathRouter } from "../../router/path.route";
import { TextConstant } from "../../../core/data/textConstant";


export const CoorporateList = () => {
    const {data:companies=[]}=useGetCoorporateQuery("");
   const   path= `/${PathRouter.coorporate}`;
    return (
         <TablePagination 
         th={["Nom", "Email", "Addresse", "Phone","Solde", "Status", ""]}
         createPath={`${path}/${PathRouter.create}`}
         title={TextConstant.coorporateStr} subtitle='List des oraganisations  et status ' trs={
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
                        <Link to={`${path}/details/${company.id}`} className="last_td">
                          Details<span className="sr-only">, {company.phone}</span>
                        </Link>
                        <Link to={`${path}/edit/${company.id}`} className="last_td">
                          Modifier<span className="sr-only">, {company.phone}</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
            </>
         }/>
    )
}
