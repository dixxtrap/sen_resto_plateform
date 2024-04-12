import {  useGetProductQuery } from "../../cores/apis/product.slice";
import { initPagination } from "../../cores/models/pagination.model";
import { PlateItem } from "../components/product_item";
import { AutoCompletionCompanies } from "../components/auto_completion";
import { Input } from "../components/input";
import { useProfileQuery } from "../../cores/apis/security.slice";
import { useState } from "react";
import { DialogAlert } from "../components/dialog";
import { LoginForm } from "../components/protectted_action";

export const PlateList = () => {
  const { isSuccess:isLogin}=useProfileQuery("")
  const[showLogin, setShowLogin]=useState(false)
const {data:products, isLoading, isSuccess}=useGetProductQuery(initPagination)
  return (
    <>
      {isLoading && <div>loding....</div>}
      {showLogin && <DialogAlert  onClose={()=> setShowLogin(false)} isOpen={showLogin}>
        <LoginForm action={()=>setShowLogin(false)}/></DialogAlert>}
      {products && isSuccess && (
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-2  sm:px-6 lg:max-w-6xl xl:max-w-7xl   lg:px-8">
            <h2 className="sr-only">Products</h2>
            <div className="flex items-center w-full justify-between py-3">
              <Input className="max-w-xs">
              <input className="input bg-white"  placeholder="Rechercher"  />
              </Input>
              <AutoCompletionCompanies />
            </div>
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
            <div onClick={()=>!isLogin&&setShowLogin(true)} className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4  xl:gap-x-6">
              {products!.data.map((product) => (
                <PlateItem product={product} isLogin={isLogin} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
