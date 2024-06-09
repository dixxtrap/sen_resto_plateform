import { useState } from "react";
import { ProductDto } from "../../../../cores/models/product";


import { PlateItemPoppup } from "./order_poppup";


export const PlateItem = ({ product, isLogin=true}: { product: ProductDto ,isLogin:boolean}) => {
  const [open, setOpen] = useState<boolean>(false);
console.log(isLogin)
  return (
    <>
      <PlateItemPoppup open={open} setOpen={setOpen} product={product}  />
      <div
        className='flex flex-col items-center mt-12 py-4  bg-gray-100 px-4 rounded-lg  ring-1  ring-black/10'
        >
          <img className='h-32 rounded-full -mt-12 ring-1 ring-gray-200' src={product.file![0].path}/>
          <span className='title2'> {product.name}</span>
          <div className='flex gap-3'>
          <span className='title3 line-through  decoration-2 text-gray-500'> {product.price} </span>
          <span className='title3  text-primary-300'> {product.price!*(1-product.reduction!/100)} F CFA</span>
          </div>
          <span className=' text-gray-500 text-sm '> {product.parent?.shortname}</span>
        </div>

    </>
  );
};
