import { TablePagination } from "../../components/table_pagination";
import {
  useGetDayQuery,
  useGetRestaurantProductQuery,
} from "../../../core/features/product.slice";
import { BuildingStorefrontIcon } from "@heroicons/react/24/outline";
import { clsx } from "../../utils/clsx";
import { Link } from "react-router-dom";
import { Alert } from "../../components/alert_success";


export const PlateList = () => {
  const { data: day=[] } = useGetDayQuery(null);
  const {
    data: productManagements ,
    isSuccess,
    isLoading,
  } = useGetRestaurantProductQuery(``);
  return (
    <>
     { isLoading &&<Alert isOpen={true} type="loading" />}
      <TablePagination
        title="Prduits"
        
        createPath="/product/create"
createTitle="Creer un nouveau Produit"
        th={[
          "Nom",
          "Préparation",
          "Prix",
          "Reduction",
          ...day?.map(e=>e.name?.slice(0,3)!),
          "",
        
        ]}
        trs={
          isSuccess && (
            <>
              {productManagements?.data.map((productManagement) => (
                <tr key={`plate_${productManagement.product?.id}`}>
                  <td className="">
                    <div className="flex items-center gap-x-0">
                      <div className=" flex-shrink-0 w-10">
                       {productManagement.product?.file && productManagement.product?.file.length!>0?<img title='image' src={`${productManagement.product?.file![0].path}`} className="h-7 rounded-md"/>:<BuildingStorefrontIcon className="h-7" />}
                          {/* <Img
                            hasImg={true}
                            icon={<BuildingStorefrontIcon className="h-7" />}
                            className="h-8 rounded-md aspect-square"
                            imgId={ e.plate?.file?.length!>0? e.plate?.file![0].photoId! : 1}
                          /> */}
                      
                      </div>
                      <div className="flex flex-shrink-0 flex-col">
                        <div className="font-semibold w-36 truncate">
                          {productManagement.product?.name}
                        </div>
                         
                      </div>
                    </div>
                  </td>
                  <td className="">{productManagement.product?.cookingTime} min</td>
                  <td className="">{productManagement.product?.price} F CFA</td>
                  <td className=""> {productManagement.product?.reduction} %</td>
                  { productManagement?.productManagementDay?.map(managementDay=><td className=" " key={`day_${managementDay.dayId}`}>
                      <div
                        className={clsx(
                          managementDay.isActive ? "bg-secondary-400/20 " : "bg-slate-400/20",
                          " h-4 w-4 rounded-full p-1"
                        )}
                      >
                        <div
                          className={clsx(
                            managementDay.isActive ? "bg-secondary-500  " : "bg-primary-400",
                            "rounded-full h-full w-full"
                          )}
                        ></div>
                      </div>
                    </td>
                  )}
                
                  <td className="relative whitespace-nowrap py-3 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <Link to={`/product/details/${productManagement.productId}`} className="last_td reject">
                      Voir detail
                    </Link>
                    <Link to={`/product/edit/${productManagement.productId}`} className="last_td accept">
                      Modifier le Produit
                    </Link>
                    <Link to={`/product/management/${productManagement.productId}`} className="last_td default">
                      Modifier le menu
                    </Link>
                  </td>
                </tr>
              ))}
            </>
          )
        }
        subtitle="Liste des Produits"
      />
    </>
  );
};
