import {  useGetProductQuery } from "../../../cores/apis/product.slice";
import { initPagination } from "../../../cores/models/pagination.model";
import { PlateItem, ProductItem } from "./widget/product_item";
import { AutoCompletionCompanies } from "./widget/auto_completion";
import { Input } from "../../components/input";
import { useProfileQuery } from "../../../cores/apis/security.slice";
import { useState } from "react";
import { DialogAlert } from "../../components/dialog";
import { LoginForm } from "../../components/login/login_form";
import { CategoryPageniationWidget } from "./widget/category_pagination_widget";
import { Select, TextInput } from "@mantine/core";
import { useGetCategoryBaseQuery, useGetCategoryQuery } from "../../../cores/apis/api";

export const PlateList = () => {
  const { isSuccess:isLogin}=useProfileQuery("")
  const coategories=useGetCategoryBaseQuery("")
  const [category, setCategory]=useState<number>(0)
  const [company, setCompany]=useState<number>(0)
  const[showLogin, setShowLogin]=useState(false)
const {data:products, isLoading, isSuccess}=useGetProductQuery(initPagination)
  return (
    <>
      {isLoading && <div>loding....</div>}
      {showLogin && <DialogAlert   onClose={()=> setShowLogin(false)} isOpen={showLogin}>
        <LoginForm action={()=>setShowLogin(false)}/></DialogAlert>}
      {products && isSuccess && (
        <div className="bg-white ">
          <div className="mx-auto  px-2  max-w-7xl    ">
            <h2 className="sr-only">Products</h2>
            
            {/* <div className="grid grid-cols-8 gap-5 gap-x-3 flex-wrap py-2 pb-8">
              {tags.slice(0, 8).map((tag) => (
                <div
                  className={clsx(
                    "whitespace-nowrap text-center bg-gradient-to-tr  font-bold    ring-inset rounded-2xl py-1 px-6 text-sm",
                    tag.id! % 5 == 0 ?
                      "from-red-500 to-red-300 text-white  ring-red-100 ring-2  ":"from-slate-500/20 to-slate-500/5  ring-1 outline-2 text-gray-500 ring-gray-200"
                  )}
                >
                  {tag.name}
                </div>
              ))}
            </div> */}
            <CategoryPageniationWidget current={category} onclick={(id)=>setCategory(id)} ></CategoryPageniationWidget>
            <div  className="grid grid-cols-2   gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4  ">
              {products!.data.map((product) => (
                <div onClick={()=>!isLogin&&setShowLogin(true)}>
                <ProductItem product={product}  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
