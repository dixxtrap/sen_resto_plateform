import {  useGetProductQuery } from "../../../cores/apis/product.slice";
import { initPagination } from "../../../cores/models/pagination.model";
import {  ProductItem } from "./widget/product_item";
import { useProfileQuery } from "../../../cores/apis/security.slice";
import { useState } from "react";
import { DialogAlert } from "../../components/dialog";
import { LoginForm } from "../../components/login/login_form";
import { CategoryPageniationWidget } from "./widget/category_pagination_widget";
import { Divider, Grid, GridCol } from "@mantine/core";
// import { useGetCategoryBaseQuery } from "../../../cores/apis/api";

export const PlateList = () => {
  const { isSuccess:isLogin}=useProfileQuery("")
  // const _coategories=useGetCategoryBaseQuery("")
  const [category, setCategory]=useState<number>(0)
  const [_company, _setCompany]=useState<number>(0)
  const[showLogin, setShowLogin]=useState(false)
const {data:products, isLoading, isSuccess}=useGetProductQuery(initPagination)
  return (
    <>
      {isLoading && <div>loding....</div>}
      {showLogin && <DialogAlert   onClose={()=> setShowLogin(false)} isOpen={showLogin}>
        <LoginForm close={close} action={()=>setShowLogin(false)}/></DialogAlert>}
      {products && isSuccess && (
        <div className="bg-white  ">
          <div className="mx-auto flex  flex-col  gap-2   px-2  max-w-7xl    ">
            <h2 className="sr-only">Products</h2>
            
          
            <CategoryPageniationWidget current={category} onclick={(id)=>setCategory(id)} ></CategoryPageniationWidget>
           
            <Grid    className="w-full pt-4 gap-1 ">
              {products!.data.map((product) => (
                <GridCol p={{base:3,md:8}} span={{base:6,  md:4, lg:3}} className="grow" onClick={()=>!isLogin&&setShowLogin(true)}>
                <ProductItem  product={product}  />
                </GridCol>
              ))}
            </Grid>
          </div>
        </div>
      )}
    </>
  );
};
