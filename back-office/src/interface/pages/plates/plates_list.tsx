import { TablePagination } from "../../components/table/table";
import {
  useGetDayQuery,
  useGetRestaurantProductQuery,
} from "../../../core/features/product.slice";
import { BuildingStorefrontIcon } from "@heroicons/react/24/outline";
import { clsx } from "../../utils/clsx";
import { Link } from "react-router-dom";
import { Status } from "../../components/status";
import { Button, Table } from "@mantine/core";
import { TableActionItemDetails, TableActionItemEdit } from "../../components/table/action_item";


export const PlateList = () => {
  const { data: day=[] } = useGetDayQuery(null);
  const products = useGetRestaurantProductQuery(``);
  console.log(products);
  return (

      <TablePagination
      isPaginated
        title="Prduits"
        {...products}
        createPath="/product/create"
createTitle="Creer un nouveau Produit"
        th={[
          "Nom",
          "Préparation",
          "Prix",
          "Reduction",
          ...day?.map(e=>e.name?.slice(0,3)!),
        "Status",

          "",
        ]}
        trs={
         
            <>
              {products.data?.data.map((productManagement) => (
                <Table.Tr key={`plate_${productManagement.product?.id}`}>
                  <Table.Td className="">
                    <div className="flex items-center gap-x-0">
                      <div className=" flex-shrink-0 w-10 mr-2">
                       {productManagement.product?.file && productManagement.product?.file.length>0?<img alt="img" title='image' src={`${productManagement.product?.file![0].path}`} className="h-7 rounded-md"/>:<BuildingStorefrontIcon className="h-7" />}
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
                  </Table.Td>
                  <Table.Td className="">{productManagement.product?.cookingTime} min</Table.Td>
                  <Table.Td className="">{productManagement.product?.price} F CFA</Table.Td>
                  <Table.Td className=""> {productManagement.product?.reduction} %</Table.Td>
                  { productManagement?.productManagementDay?.map(managementDay=><Table.Td className=" " key={`day_${managementDay.dayId}`}>
                      <div
                        className={clsx(
                          managementDay.isActive ? "bg-green-400/20 " : "bg-red-400/20",
                          " h-4 w-4 rounded-full p-1"
                        )}
                      >
                        <div
                          className={clsx(
                            managementDay.isActive ? "bg-green-500  " : "bg-rose-400",
                            "rounded-full h-full w-full"
                          )}
                        ></div>
                      </div>
                    </Table.Td>
                  )}
                <Table.Td>
                  <Status status={productManagement.product?.isActive ===true}/>
                </Table.Td>
                  <Table.Td className="relative whitespace-nowrap py-3 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    {/* <Link  to={`/product/details/${productManagement.productId}`} className="last_td reject">
                      Voir detail
                    </Link>
                    <Link to={`/product/edit/${productManagement.productId}`} className="last_td accept">
                      Modifier le Produit
                    </Link> */}
                      <Button size="compact-md" fw={400}  component={Link} to={`/product/management/${productManagement.productId}`} className="">
                      Modifier le menu
                    </Button>
                    <TableActionItemDetails label='voir details' path={`/product/details/${productManagement.productId}`}/>
            <TableActionItemEdit label='Modifier le Produit' path={`/product/edit/${productManagement.productId}`}/>
            
                  
                  </Table.Td>
                </Table.Tr>
              ))}
            </>
          
        }
        subtitle="Liste des Produits"
      />

  );
};
