import React from "react";
import { useGetResttaurantQuery } from "../../../core/features/restaurant.slice";
import { TablePagination } from "../../components/table_pagination";
import { Img } from "../../components/image_updatable";
import { Link } from "react-router-dom";
import { Status } from "../../components/status";
import { formatDate } from "../../utils/date_format";
import { ProtecterPage } from "../../components/protecter_page";

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
          "Date de création",
          "Status",
          "",
        ]}
        trs={
          <>
            {restaurants.map((restaurant) => (
              <tr key={restaurant.email} className="">
                <td className="">
                  <div className="flex items-center">
                    <Img
                      hasImg={true}
                      className="w-8 rounded-md mr-3 "
                      imgId={
                        restaurant.parent?.id === 1
                          ? restaurant.profile?.id
                          : restaurant.parent?.profile?.id ?? 1
                      }
                    />
                    {/* <ImgPreview  name={`img_${restaurant.id}`} img={ restaurant.company.short_name=="SR" ? restaurant.profile!:restaurant.company.profile!}/> */}

                    <div className="flex flex-col">{restaurant.name}</div>
                  </div>
                </td>
                <td className=""> {restaurant.parent?.name}</td>
                <td className="">{restaurant.city}</td>
                <td className="">{restaurant.phone}</td>

                <td className="">
                  {restaurant.openingTime?.substring(0, 5)} /{" "}
                  {restaurant.closingTime?.substring(0, 5)}
                </td>
<td>
{formatDate(restaurant.createdAt!)}
</td>
                <td className="">
                  <Status status={restaurant.isActive!} />
                </td>

                <td className="relative whitespace-nowrap py-3 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                <ProtecterPage isPage={false} permissions={[{code:"PLAT_MANAGEMENT", type:"CREATE"}]}>
                <Link
                    to={`/restaurant/plats/${restaurant.id}`}
                    className="last_td"
                  >
                    Plats<span className="sr-only">, {restaurant.phone}</span>
                  </Link>
                </ProtecterPage>
                  <Link
                    to={`/restaurant/details/${restaurant.id}`}
                    className="last_td"
                  >
                    Details<span className="sr-only">, {restaurant.phone}</span>
                  </Link>
                  <Link
                    to={`/restaurant/edit/${restaurant.id}`}
                    className="last_td"
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
