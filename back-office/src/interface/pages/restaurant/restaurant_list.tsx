import { useGetResttaurantQuery } from "../../../core/features/restaurant.slice";
import { Link } from "react-router-dom";
import { Status } from "../../components/status";
import { formatDate } from "../../utils/date_format";
import { ProtecterPage } from "../../components/protecter_page";
import { BuildingStorefrontIcon } from "@heroicons/react/24/solid";
import { TablePagination } from "../../components/table/table";
import { Table } from "@mantine/core";
import { TableActionItemDetails, TableActionItemEdit } from "../../components/table/action_item";
import { PermissionCode } from "../../utils/per;ission_code";


export const RestaurantList = () => {
  const { data: restaurants ,...state} = useGetResttaurantQuery("");
  console.log(restaurants)
  return (
    <div>
      <TablePagination
      {...state}
        title="Restaurant"
        createPath="/restaurant/create"
        subtitle="Liste des Restaurants"
        th={[
          "Nom",
          
          "Adresse",
          "Téléphone",

          "Ouv/Ferm",
          "Date de création",
          "Status",
          "",
        ]}
        trs={
          <>
            {restaurants?.data.map((restaurant) => (
              <Table.Tr key={restaurant.email} className="">
                <Table.Td className="">
                
                    {/* <ImgPreview  name={`img_${restaurant.id}`} img={ restaurant.company.short_name=="SR" ? restaurant.profile!:restaurant.company.profile!}/> */}

                    <div className="flex items-center">
                        <div className=" pl-2 flex-shrink-0  w-16 mr-2 content-center flex  justify-start ">
                          {/* <ImgPreview name={`Prile_${company?.profile?.id}`} className='bg-blue-400 h-11' img={company.profile!}/> */}
                          {  restaurant.imagePath? <img src={`${restaurant.imagePath!}`} className='h-8 rounded-md' alt=""  />:<BuildingStorefrontIcon className='h-8 p-1 text-primary-500 bg-secondary-500/20 ring-2  ring-secondary-500/80 rounded-md'/>}
                        </div>
                       
                          <div className="font-medium ">{restaurant.name}</div>
                          {/* <div className="mt-1 text-gray-500">{company.email}</div> */}
                      
                      </div>  
               
                  
                 
                </Table.Td>
               
                <Table.Td className="">{restaurant.address}{restaurant.city?.name}</Table.Td>
                <Table.Td className="">{restaurant.phone}</Table.Td>

                <Table.Td className="">
                  {restaurant.openingTime?.substring(0, 5)} /{" "}
                  {restaurant.closingTime?.substring(0, 5)}
                </Table.Td>
<Table.Td>
{formatDate(restaurant.details?.createdAt!)}
</Table.Td>
                <Table.Td className="">
                  <Status status={restaurant.isActive!} />
                </Table.Td>

                <Table.Td className="last_td_container">
                  
                <ProtecterPage isPage={false} permissions={[{code:PermissionCode.PRODUCT_MANAGEMENT, type:"CREATE"}]}>
                <Link
                    to={`/restaurant/plats/${restaurant.id}`}
                    className="last_td reject"
                  >
                    Product<span className="sr-only">, {restaurant.phone}</span>
                  </Link>
                </ProtecterPage>
                <TableActionItemDetails label='voir details' path={`/restaurant/details/${restaurant.id}`}/>
            <TableActionItemEdit label='Modifier le Produit' path={`/restaurant/edit/${restaurant.id}`}/>
            
                </Table.Td>
              </Table.Tr>
            ))}
          </>
        }
      />
    </div>
  );
};
