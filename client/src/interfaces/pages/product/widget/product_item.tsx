import { useState } from "react";
import { ProductDto } from "../../../../cores/models/product";


import { PlateItemPoppup } from "./order_poppup";
import { ShoppingBagIcon, StarIcon } from "@heroicons/react/24/solid";
import { Str } from '../../../../cores/constantes/str';


export const PlateItem = ({ product, isLogin=true}: { product: ProductDto ,isLogin:boolean}) => {
  const [open, setOpen] = useState<boolean>(false);
console.log(isLogin)
  return (
    <>
      <PlateItemPoppup open={open} setOpen={setOpen} product={product} />
      <div className="flex flex-col items-center mt-12 pt-4  bg-gray-100  rounded-lg  ring-1  ring-black/10">
        <img
          alt="logo"
          className="md:h-40  md:-mt-20 rounded-full h-32 -mt-16  ring-1 ring-gray-200"
          src={product.file![0].path}
        />
        <div className="flex flex-col w-full divide-y divide-gray-500/50 ">
          <div className="flex flex-col item-center justify-center text-center pb-3">
            <span className="title2 text-center leading-3 h-[60px]"> {product.name}</span>
            <div className="flex gap-3 items-start justify-center ">
              {product.reduction != null && product.reduction > 0 && (
                <span className="title3 line-through  decoration-2 text-gray-500">
                  {" "}
                  {product.price}{" "}
                </span>
              )}
              <span className="title3  text-primary-300">
                {" "}
                {Math.fround(product.price! * (1 - product.reduction! / 100))} F
                CFA
              </span>
            </div>
            <span className=" text-gray-500 text-sm ">
              {" "}
              {product.parent?.shortname}
            </span>
          </div>
          <div className="grid grid-cols-2  w-full divide-x  divide-gray-500/50 ">
          <div className="flex gap-2 cursor-pointer  justify-starts p-2 place-items-end  hover:bg-secondary-400 hover:text-white">
            <StarIcon className="h-6" /> <span className="leading-3">{Str.favoris}</span>
          </div>

          <div onClick={()=>setOpen(true)} className="flex  gap-2 cursor-pointer justify-end p-2  hover:bg-secondary-400 hover:text-white  place-items-end">
           <span className="leading-3"> {Str.bag}</span>
            <ShoppingBagIcon className="h-6" />
          </div>
        </div>
        </div>
      
      </div>
    </>
  );
};
