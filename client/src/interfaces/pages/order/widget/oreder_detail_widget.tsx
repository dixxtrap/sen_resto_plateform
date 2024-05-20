import  { FC } from 'react'
import { OrderDto } from '../../../../cores/models/order.dto'
import { Title } from '../../../components/title'
import { TextConstant } from '../../../../cores/constant/textConstant';
import clsx from 'clsx';
type OrderWidgetProps={
    order:OrderDto
}


export const OrderDetailsItem = ({value, label, magnify}:{value?:string, label?:string, magnify?:boolean}) => {
  return (
    <div className="flex my-1 justify-between">
      <span className="grow">{label}</span>
      <span
        className={clsx(
          magnify &&
            "ring-1  font-bold rounded-md   bg-white  ring-gray-500/30 ",
          " text-center  px-3 "
        )}
      >
        {value}
      </span>
    </div>
  );
}

export const OrderDetailWidget:FC<OrderWidgetProps> = ({order}) => {
  return (
    <div className='flex grow flex-col px-3'>
    <Title  title={ order.partner.name}></Title>
    <div className="flex  flex-col divide-y grow ">
{order.products.map(orderProduct=><div className='flex flex-col  justify-between w-full'>
  
 <div className='flex  flex-col '>
   <OrderDetailsItem label={orderProduct.productHistory.product.name} value={`${orderProduct.productHistory.price} ${TextConstant.Currency}`}/>
   <OrderDetailsItem label={TextConstant.quantity} value={`${orderProduct.quantity}`}/>
 </div>
   <OrderDetailsItem label={TextConstant.Total} magnify value={`${orderProduct.productHistory.price*orderProduct.quantity} ${TextConstant.Currency}`} />
 

</div>)}
    </div>
    {/* <button className="button primary text-2xl">Valider la commande</button> */}
    </div>
  )
}
