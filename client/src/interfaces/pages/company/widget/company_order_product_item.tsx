import { SimpleGrid, Image , Text, ActionIcon, LoadingOverlay } from "@mantine/core"
import { OrderProduct } from "../../../../cores/models/order.dto"
import { orderApi } from "../../../../cores/apis/order.slice"
import PlusIcon from "@heroicons/react/24/solid/PlusIcon"
import MinusIcon from "@heroicons/react/24/solid/MinusIcon"



export const CompanyOrderProductItem = ({orderProduct}:{orderProduct:OrderProduct}) => {
    const [addProduct, addProductState]=orderApi.useAddProductMutation()
  const handlmeQuantity=({quantity}:{quantity:number})=>{
    addProduct({ productId: orderProduct.productHistory.product.id!,quantity  })
  }
  return (
    <>
    <LoadingOverlay
          visible={addProductState.isLoading}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ color: 'pink', type: 'bars' }}
        />
    <SimpleGrid p={1} cols={12}>
    <div className="h-20 ring-1 ring-slate-300 rounded-md col-span-4">
      <Image
        className="h-full rounded-md"
        src={orderProduct.productHistory?.product?.file![0].path}
      />
    </div>
    <div className="grow col-span-8 ">
      <div className="flex flex-col w-full">
        <Text
          lineClamp={1}
          className="break-words font-bold line-clamp-1"
        >
          {orderProduct.productHistory.product.name}
        </Text>
        <Text
          fw={400}
          lineClamp={1}
          className="text-sm md:text-base  text-gray-600"
        >
          {orderProduct.productHistory.product.description}
        </Text>
      </div>
      <div className="flex justify-end  w-full items-center gap-2">
        <ActionIcon radius={100} onClick={()=>handlmeQuantity({quantity:orderProduct.quantity-1})}>
          <MinusIcon />
        </ActionIcon>
        <span className="font-bold">{orderProduct.quantity}</span>
        <ActionIcon radius={100} onClick={()=>handlmeQuantity({quantity:orderProduct.quantity+1})}>
          <PlusIcon />
        </ActionIcon>
      </div>
    </div>
  </SimpleGrid>
  </>
  )
}
