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
        <div className="flex flex-col w-full divide-y divide-gray-600">
          <div className="flex flex-col item-center justify-center text-center ">
            <span className="title2 text-center"> {product.name}</span>
            <div className="flex gap-3 items-start justify-center">
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
          <div className="grid grid-cols-2  w-full divide-x-2  divide-gray-500 ">
          <div className="flex gap-2 items-center p-2 ">
            <StarIcon className="h-8" /> {Str.favoris}
          </div>

          <div className="flex gap-2 justify-end p-2  items-center">
            {Str.bag}
            <ShoppingBagIcon className="h-8" />
          </div>
        </div>
        </div>
      
      </div>
    </>
  );
};
