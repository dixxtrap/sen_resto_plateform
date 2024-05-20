import { useState } from "react";
import { ProductDto } from "../../../../cores/models/product";
import { PlusIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";


import { PlateItemPoppup } from "./order_poppup";


export const PlateItem = ({ product, isLogin=true}: { product: ProductDto ,isLogin:boolean}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <PlateItemPoppup open={open} setOpen={setOpen} product={product} />
      <div key={product.id} className="group pl-3 sm:pl-0 plate flex items-center justify-start  md:flex-col">
        <div className="aspect-h-1  aspect-w-1 md:w-full  overflow-hidden   xl:aspect-h-4 xl:aspect-w-7 relative">
        <div> 
        <img
            src={`${product?.file![0]?.path??1}`}
            alt={product.name}
            className="h-20  md:h-60 lg:h-72 w-20 md:w-full   rounded-md md:rounded-none   object-cover  md:object-cover group-hover:opacity-75"
          />
        </div>
          <div className="describe  w-full">
            <div className="flex flex-col h-full">
              <span className="title2">{product.name}</span>
              <span className=" leading-6 text-sm text-justify ">
                {product.description}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col px-2 pt-2  w-full">
          <h3 className=" title2 line-clamp-1">{product.name}</h3>
          <p className="text-slate-700">
            { product.parent?.shortname}
          </p>

          <div className="flex justify-between w-full items-center py-2 ">
            <p className="mt-1 text-lg  text-secondary-500 font-bold">
              {product.price} F CFA
            </p>
            <button
         onClick={()=>isLogin && setOpen(true)}
         className="bg-primary-500 px-3 py-2 rounded-md outline-primary-100 outline-2 outline outline-inset flex items-center"
       >
         {" "}
         <PlusIcon className="h-2 text-white " />
         <ShoppingCartIcon className="h-5 text-white " />
       </button>
          </div>
        </div>
      </div>
    </>
  );
};
