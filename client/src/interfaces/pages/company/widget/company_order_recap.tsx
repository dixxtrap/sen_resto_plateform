import { Divider } from "@mantine/core"
import { OrderDto } from "../../../../cores/models/order.dto"
import { priceFormated, reductionPrice, totalPriceFormated } from "../../../../utils/calcul"


export const CompanyOrderRecap = ({order}:{order:OrderDto}) => {
  console.log(order)
  return (
    <div className="flex flex-col gap-2">
      

      {order.products.map(p=>(<div className="grid grid-cols-12  ">
        <div className="line-clamp-1 col-span-8 break-words">
        {p.productHistory.product.name}
        </div>
        <div className="col-span-4  text-right">
      {p.quantity} X {reductionPrice({price:p.productHistory.price!, reduction:p.productHistory.reduction!})}
        </div>
      </div>
    ))}
    <Divider className="col-span-12 "/>
    <div className="grid grid-cols-12  ">
        <div className="line-clamp-1 col-span-8 break-words">
        Livraison
        </div>
        <div className="col-span-4  text-right">
        {priceFormated({price:order.fees})}
        </div>
      </div>
    <Divider className="col-span-12 "/>
    <div className="grid grid-cols-12 ">
     <div className="line-clamp-1 col-span-8 break-words">
        TOTAL
        </div>
        <div className="col-span-4 text-right">
        {totalPriceFormated(order,{add:order.fees})}
        </div>
        </div>
    </div>
  )
}
