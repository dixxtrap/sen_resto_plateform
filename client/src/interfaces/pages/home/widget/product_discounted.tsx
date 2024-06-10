import { useGetProductDistcountedQuery } from '../../../../cores/apis/product.slice'
import { initPagination } from '../../../../cores/models/pagination.model'
import { Str } from '../../../../cores/constantes/str'

export const ProductDiscountedWidget = () => {
    const {data:product, isLoading, isSuccess, isError}=useGetProductDistcountedQuery(initPagination)
  return (
    <div className='flex flex-col py-4 items-center'>
     
      <span className='title1 '>{Str.discounTitle}</span>
      <div className='h-10'></div>
    {isLoading&&<span>chargement</span>}
    {isError&&<span>erreur interner</span>}
    {product&&isSuccess&& 
    <div className='grid grid-cols-3 gap-4'>
        {product.data.map(e=>
        <div
        key={`product_${e.id}`}
        className='flex flex-col items-center mt-12 py-4  bg-gray-100 px-4 rounded-lg  ring-1  ring-black/10'
        >
          <img  alt="logo" className='h-32 rounded-full -mt-12 ring-1 ring-gray-200' src={e.file![0].path}/>
          <span className='title2'> {e.name}</span>
          <div className='flex gap-3'>
          <span className='title3 line-through  decoration-2 text-gray-500'> {e.price} </span>
          <span className='title3  text-primary-300'> {Math.round(e.price!*(1-e.reduction!/100))} F CFA</span>
          </div>
          <span className=' text-gray-500 text-sm '> {e.parent?.shortname}</span>
          </div>)}</div>}
        </div>

  )
}
