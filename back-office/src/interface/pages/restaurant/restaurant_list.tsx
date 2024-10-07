import { useGetResttaurantQuery } from "../../../core/features/restaurant.slice";
import { Link } from "react-router-dom";
import { Status } from "../../components/status";
import { formatDate } from "../../utils/date_format";
import { ProtecterPage } from "../../components/protecter_page";
import { TablePagination } from "../../components/table/table";
import { Button, Image, Table } from "@mantine/core";
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

                    <div className="flex gap-4 items-center">
                        <div>
                        <Image className="size-8" fallbackSrc="" src={restaurant.backgroundPath}/>

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
                <Button component={Link}
                    to={`/restaurant/plats/${restaurant.id}`}
                    className="ring-1  ring-secondary-400 "
                    size="compact-sm"
                   
                    fw={400}
                  >
                    Product<span className="sr-only">, {restaurant.phone}</span>
                  </Button>
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
