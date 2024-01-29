
import {

  useGetRestaurantProductByIdQuery,
  useGetRestaurantProductQuery,
  // useGetRestaurantUserProductQuery,
} from "../../../core/features/product.slice";

import { useParams } from "react-router-dom";
import { TablePagination } from "../../components/table_pagination";
import { Title } from "../../components/title";
import { useGetRestaurantByIdQuery } from "../../../core/features/restaurant.slice";
import { RestaurantAddProduct } from "./restaurant_add_product";

export const RestaurantPlatManagement = () => {
  const { id } = useParams();
  const {data:restaurant}=useGetRestaurantByIdQuery(parseInt(id!))
  const {
    data: productManagements = [],
    isLoading,isSuccess
  } = useGetRestaurantProductByIdQuery(parseInt(id!));
  const {data : allProduct=[]}=useGetRestaurantProductQuery("")

console.log("",productManagements)
//   const handleClick=(item: ProductManagementDto)=>{
// console.log(item)
// if(!listProductManagement.some(e=>e.productId===item.productId)){
//   setListProductManagement(prev=>{return [...prev,{...item, isActive:true} ]})
// }
// else{
//   setListProductManagement(prev=>{return [...prev.filter(i=>i.productId!==item.productId)]})
// }
//   }
  return (
    <div className="flex flex-col ">
      <div className="flex justify-between items-end ">
      <Title
          title={`${restaurant?.name}`}
          subTitle={`Lister des produits ${""}`}
        />
       <RestaurantAddProduct productManagement={allProduct.filter(item=>!productManagements.some(item2=>item.productId===item2.productId))}/>
       
        </div>
      <TablePagination th={["nom", "description",""]} trs={<>
      { !isLoading&& isSuccess &&productManagements.map(productManagement=><tr>
        <td>
          <div className="flex items-center gap-2 font-bold">
            <img src={`/v1/${productManagement.product?.file![0].path}`} className="h-10 rounded-md" alt="" />
       <span>   {productManagement.product?.name }</span>
          </div>
         
        </td>
        <td>
          {productManagement.product?.description}
        </td>
      </tr>)}
      </>} />
        
        
        {/* {validplats.map(item=><span>{item.companyId}</span>)} */}
      <div className="grid md:grid-cols-3 gap-2 rounded-md ">
        {/* {plats.map((item) => (
        <PalteManagementItem onClick={async () => handleClick({ partnerId: parseInt(id!), productId: item.product?.id })} product={item.product!} companyId={parseInt(id!)} isValid={listProductManagement.some((vItem) => item.productId === vItem.productId)}/>
        ))} */}
      
      </div>
    </div>
  );
};
