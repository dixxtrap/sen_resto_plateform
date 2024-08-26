import { FC, useState } from "react"
import { OrderDto } from "../../../../cores/models/order.dto"
import { OrderProductWidget } from "./order_produuct_widget"
import { OrderDetailWidget } from "./oreder_detail_widget"

type OrderWidgetProps={
    order:OrderDto
}
export const OrderWidget :FC<OrderWidgetProps> = ({order}) => {
  const [current , setCurrent]=useState(0)
  const next=()=>{
if(current<order.products.length-1) setCurrent(current+1)
  }
const after=()=>{
if(current>0) setCurrent(current-1)
}
  return (
    <div
      key={`order_${order.id}`}
      className="bg-slate-200/40 ring-1 overflow-hidden ring-gray-500/30  flex flex-col rounded-md"
    >
      <div className="flex  w-full">
        <div className="flex flex-col divide-y grow max-w-2xl bg-white ">
         
            <OrderProductWidget next={next} after={after} orderProduct={order.products[current]} />
        
        </div>
        <OrderDetailWidget order={order} />
      </div>
      <button className="button primary text-2xl">Valider la commande</button>
    </div>
  );
}
