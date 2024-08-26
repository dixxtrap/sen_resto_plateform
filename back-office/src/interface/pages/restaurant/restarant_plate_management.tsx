
import {

  useGetRestaurantProductByIdQuery,
  useGetRestaurantProductQuery,
  // useGetRestaurantUserProductQuery,
} from "../../../core/features/product.slice";

import { useParams } from "react-router-dom";
import { Title } from "../../components/title";
import { useGetRestaurantByIdQuery } from "../../../core/features/restaurant.slice";
import { RestaurantAddProduct } from "./restaurant_add_product";
import { TablePagination } from "../../components/table/table";
import { Table, Text } from "@mantine/core";
import { Status } from "../../components/status";

export const RestaurantPlatManagement = () => {
  const { id } = useParams();
  const {data:restaurant}=useGetRestaurantByIdQuery(parseInt(id!))
  const {
    data: productManagements ,
    ...state
  } = useGetRestaurantProductByIdQuery(parseInt(id!));
  const {data : allProduct}=useGetRestaurantProductQuery("")

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
          title={`${restaurant?.data.name}`}
          subTitle={`Lister des produits ${""}`}
        />
       <RestaurantAddProduct productManagement={allProduct?.data.filter(item=>!productManagements?.data.some(item2=>item.productId===item2.productId))!}/>
       
        </div>
      <TablePagination{ ... state} th={["nom","Price", "description","status", ""]} trs={<>
      { productManagements?.data.map(productManagement=><Table.Tr>
        <Table.Td>
          <div className="flex items-center gap-2 font-bold">
            <img src={`${productManagement?.product?.file![0].path}`} className="h-10 rounded-md" alt="" />
       <span>   {productManagement?.product?.name }</span>
          </div>
         
        </Table.Td>
        <Table.Td
        >
          {productManagement?.product?.price } F CFA
        </Table.Td>
       
        <Table.Td>
        <Text className="w- overflow-hidden   text- ">
          
        {productManagement?.product?.description?.slice(0,20)}
        </Text>
        </Table.Td>
        <Table.Td
        >
         <Status status={ productManagement?.isActive!}/> 
        </Table.Td>
        <Table.Td></Table.Td>
      </Table.Tr>)}
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
