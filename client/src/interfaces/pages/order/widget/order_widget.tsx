import { FC } from "react"
import { OrderDto } from "../../../../cores/models/order.dto"
import { Title } from "../../../components/title"
import { OrderProductWidget } from "./order_produuct_widget"
import { OrderDetailWidget } from "./oreder_detail_widget"

type OrderWidgetProps={
    order:OrderDto
}
export const OrderWidget :FC<OrderWidgetProps> = ({order}) => {
  return (
    <div
      key={`order_${order.id}`}
      className="bg-slate-200/40 ring-1 overflow-hidden ring-gray-500/30  flex flex-col rounded-md"
    >
      <div className="flex  w-full">
        <div className="flex flex-col divide-y grow max-w-2xl bg-white ">
          {order.products.map((p) => (
            <OrderProductWidget orderProduct={p} />
          ))}
        </div>
        <OrderDetailWidget order={order} />
      </div>
      <button className="button primary text-2xl">Valider la commande</button>
    </div>
  );
}
