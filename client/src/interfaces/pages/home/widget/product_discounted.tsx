import { useGetProductDistcountedQuery } from '../../../../cores/apis/product.slice'
import { initPagination } from '../../../../cores/models/pagination.model'
import { Str } from '../../../../cores/constantes/str'
import { ProductDiscountedItem } from './product_discounted_item'

export const ProductDiscountedWidget = () => {
    const {data:product, isLoading, isSuccess, isError}=useGetProductDistcountedQuery(initPagination)
  return (
    <div className='flex flex-col py-4 lg:px-10'>
     
      <span className='title1  pl-3'>{Str.discounTitle}</span>
      <div className='h-10'></div>
    {isLoading&&<span>chargement</span>}
    {isError&&<span>erreur interner</span>}
    {product&&isSuccess&& 
    <div className='grid grid-cols-2 md:grid-cols-4 gap-4 px-2'>
        {product.data.map(e=><ProductDiscountedItem product={e}/>)}</div>}
        </div>

  )
}
