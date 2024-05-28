
import { OrderProduct } from '../../../../cores/models/order.dto'
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/solid';
import { FC } from 'react';

type ProductOrderWidgetProps={
  orderProduct:OrderProduct,
  next:()=>void,
  after:()=>void,
}
export const OrderProductWidget:FC<ProductOrderWidgetProps> = ({orderProduct, next, after}) => {
  return (
    <div
      key={`p_${orderProduct.productHistoryId}_${orderProduct.partnerId}`}
      className="flex  flex-col py-2 item-center justify-center max-w-2xl  min-w-fit"
    >
     <div className='flex  items-center place-items-center justify-between justify-items-center'>
      <button onClick={after}>
      <ChevronDoubleLeftIcon  className='h-16'></ChevronDoubleLeftIcon>

      </button>
     {orderProduct.productHistory?.product?.file![0].path && (
        <img
          src={orderProduct.productHistory?.product?.file![0].path}
          className="w-[200px] md:w-[300px] rounded-md"
        />
      )}
      <button onClick={next}>
       <ChevronDoubleRightIcon  className='h-16'></ChevronDoubleRightIcon>

      </button>
     </div>
      <div className="flex flex-col items-center   w-full">
        <span className="title max-w-xs text-center  font-serif text-xl font-bold">
          {" "}
          {orderProduct.productHistory.product.name}
        </span>
        
        {/* <div className="flex w-full justify-between">
          <div className="flex text-slate-500 gap-2 justify-center items-center ">
            <BanknotesIcon className="icon h-5" />
            <span className="font-bold">
              {orderProduct.productHistory.price} {TextConstant.Currency}
            </span>
          </div>
          <div className="flex  text-slate-500 gap-2 justify-center items-center ">
            <select
              name="quantity"
              className="input text-xl m-3 font-semibold "
              id="quantity"
            >
              <option className="px-3" value={orderProduct.quantity}>
                {orderProduct.quantity}
              </option>
            </select>
          </div>
        </div> */}
      </div>
    </div>
  );
}
