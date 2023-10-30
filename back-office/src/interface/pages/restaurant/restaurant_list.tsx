import React from "react";
import { useGetResttaurantQuery } from "../../../core/features/restaurant.slice";
import { TablePagination } from "../../components/table_pagination";
import { Img } from "../../components/image_updatable";
import { Link } from "react-router-dom";
import { Status } from "../../components/status";

export const RestaurantList = () => {
  const { data: restaurants = [] } = useGetResttaurantQuery("");
  return (
    <div>
      <TablePagination
        title="Restaurant"
        createPath="/restaurant/create"
        subtitle="Liste des Restaurants"
        th={[
          "Nom",
          "Organisation",
          "Adresse",
          "Téléphone",
          
          "Ouv/Ferm",
          "Status",
          "",
        ]}
        trs={
          <>
            {restaurants.map((restaurant) => (
              <tr
                key={restaurant.email}
                className=""
              >
                <td className="">
                  <div className="flex items-center">
                    <Img
                      hasImg={
                        restaurant.company!.id === 1
                          ? restaurant.profile!.size! > 0
                          : restaurant.company!.profile!.size! > 0
                      }
                      className="w-8 rounded-md mr-3 "
                      imgId={
                        restaurant.company!.id === 1
                          ? restaurant.profile?.id
                          : restaurant.company!.profile?.id
                      }
                    />
                    {/* <ImgPreview  name={`img_${restaurant.id}`} img={ restaurant.company.short_name=="SR" ? restaurant.profile!:restaurant.company.profile!}/> */}

                    <div className="flex flex-col">
                    
                        {restaurant.name}
                    
                      
                     
                    </div>
                  </div>
                </td>
                <td className=""> {restaurant.company!.name}</td>
                <td className="">{restaurant.city}</td>
                <td className="">{restaurant.phone}</td>
               
                <td className="">
                  {restaurant.openingTime?.substring(0, 5)} /{" "}
                  {restaurant.closingTime?.substring(0, 5)}
                </td>

                <td className="">
               <Status status={restaurant.isActive!}     />
                </td>
                <td className="relative whitespace-nowrap py-3 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                  <Link
                    to={`/restaurant/details/${restaurant.id}`}
                    className="last_td">
                    Details<span className="sr-only">, {restaurant.phone}</span>
                  </Link>
                  <Link
                    to={`/restaurant/edit/${restaurant.id}`}
                    className="last_td">
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
