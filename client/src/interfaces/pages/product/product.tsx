import {  useGetProductQuery } from "../../../cores/apis/product.slice";
import { initPagination } from "../../../cores/models/pagination.model";
import {  ProductItem } from "./widget/product_item";
import { useState } from "react";
import { CategoryPageniationWidget } from "./widget/category_pagination_widget";
import {  Grid, GridCol } from "@mantine/core";
// import { useGetCategoryBaseQuery } from "../../../cores/apis/api";

export const PlateList = () => {
  // const _coategories=useGetCategoryBaseQuery("")
  const [category, setCategory]=useState<number>(0)
  const [_company, _setCompany]=useState<number>(0)

const {data:products, isLoading, isSuccess}=useGetProductQuery(initPagination)
  return (
    <>
      {isLoading && <div>loding....</div>}
      
      {products && isSuccess && (
        <div className="bg-white  ">
          <div className="mx-auto flex  flex-col  gap-2      ">
            <h2 className="sr-only">Products</h2>
            
          
            <CategoryPageniationWidget current={category} onclick={(id)=>setCategory(id)} ></CategoryPageniationWidget>
           
            <Grid     className="w-full pt-4 gap-1  p-3">
              {products.data.map((product) => (
                <GridCol key={product.name+" "+ product.id} p={{base:3,md:8}} span={{base:12,sm:6,  md:4, lg:4}} className="grow">
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
