
import { OrderProduct } from '../../../../cores/models/order.dto'
import { TextConstant } from '../../../../cores/constant/textConstant';
import { ArrowLeftIcon, BanknotesIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/solid';
import { FC } from 'react';

type ProductOrderWidgetProps={
  orderProduct:OrderProduct
}
export const OrderProductWidget:FC<ProductOrderWidgetProps> = ({orderProduct}) => {
  return (
    <div
      key={`p_${orderProduct.productHistoryId}_${orderProduct.partnerId}`}
      className="flex  flex-col item-center justify-center max-w-2xl  min-w-fit"
    >
     <div className='flex  item-center place-items-center justify-center justify-items-center'>
      <ChevronDoubleLeftIcon className='h-16'></ChevronDoubleLeftIcon>
     {orderProduct.productHistory?.product?.file![0].path && (
        <img
          src={orderProduct.productHistory?.product?.file![0].path}
          className="w-9/12 rounded-md"
        />
      )}
       <ChevronDoubleRightIcon className='h-16'></ChevronDoubleRightIcon>
     </div>
      <div className="flex flex-col items-center   w-full">
        <span className="title  font-serif text-xl font-bold">
          {" "}
          {orderProduct.productHistory.product.name}
        </span>
        <span className="h-10 text-slate-700">
          {orderProduct.description ??
            orderProduct.productHistory.product.description}
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
