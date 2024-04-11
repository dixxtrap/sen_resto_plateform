import { useGetResttaurantQuery } from "../../../core/features/restaurant.slice";
import { TablePagination } from "../../components/table_pagination";
import { Link } from "react-router-dom";
import { Status } from "../../components/status";
import { formatDate } from "../../utils/date_format";
import { ProtecterPage } from "../../components/protecter_page";
import { BuildingStorefrontIcon } from "@heroicons/react/24/solid";


export const RestaurantList = () => {
  const { data: restaurants } = useGetResttaurantQuery("");
  return (
    <div>
      <TablePagination
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
              <tr key={restaurant.email} className="">
                <td className="flex  items-center">
                  <div className=" flex-shrink-0  w-16 mr-2  content-center flex  justify-start ">
                  {  restaurant.imagePath? <img src={`${restaurant.imagePath!}`} className='h-8 rounded-md  ' alt=""  />:<BuildingStorefrontIcon className='h-8 pr-1 text-primary-500    mr-2 rounded-md'/>}
                    {/* <ImgPreview  name={`img_${restaurant.id}`} img={ restaurant.company.short_name=="SR" ? restaurant.profile!:restaurant.company.profile!}/> */}

                   
                  </div>
                  
                  <div className="flex flex-col font-bold">{restaurant.name}</div>
                </td>
               
                <td className="">{restaurant.address?.streetAddress} - {restaurant.address?.city} - {restaurant.address?.country}</td>
                <td className="">{restaurant.phone}</td>

                <td className="">
                  {restaurant.openingTime?.substring(0, 5)} /{" "}
                  {restaurant.closingTime?.substring(0, 5)}
                </td>
<td>
{formatDate(restaurant.details?.createdAt!)}
</td>
                <td className="">
                  <Status status={restaurant.isActive!} />
                </td>

                <td className="relative whitespace-nowrap py-3 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                <ProtecterPage isPage={false} permissions={[{code:"PRODUCT_MANAGEMENT", type:"CREATE"}]}>
                <Link
                    to={`/restaurant/plats/${restaurant.id}`}
                    className="last_td reject"
                  >
                    Product<span className="sr-only">, {restaurant.phone}</span>
                  </Link>
                </ProtecterPage>
                  <Link
                    to={`/restaurant/details/${restaurant.id}`}
                    className="last_td accept"
                  >
                    Details<span className="sr-only">, {restaurant.phone}</span>
                  </Link>
                  <Link
                    to={`/restaurant/edit/${restaurant.id}`}
                    className="last_td default"
                  >
                    Modifier
                    <span className="sr-only">, {restaurant.phone}</span>
                  </Link>
                </td>
              </tr>
            ))}
          </>
        }
      />
    </div>
  );
};
