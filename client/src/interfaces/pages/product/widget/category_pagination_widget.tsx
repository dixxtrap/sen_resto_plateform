import  { FC } from 'react'
import { useGetCategoryQuery } from '../../../../cores/apis/api'
import { Fetchingdata } from '../../../components/fetching_data'
import clsx from 'clsx'
type CategoryPageniationWidgetProps={
  current:number,
  onclick:(id:number)=>void
}
export const CategoryPageniationWidget:FC<CategoryPageniationWidgetProps>= ({current=0, onclick}) => {
const {data, isError, isLoading, isSuccess, error}=useGetCategoryQuery('')
  return (
    <Fetchingdata isError={isError} isLoading={isLoading} isSuucess={isSuccess} error={error}>
        <>
        {data&& <div className='pb-6 mb-3 overflow-x-auto flex  title2 items-stretch     ' >
        <button onClick={()=>onclick(0)} className={clsx(' w-max font-bold px-3 mx-3   min-w-fit', current==0&&'border-secondary-400 border-b-4')}><span className='overflow-ellipsis'>Tous</span></button>
            {data.data.map(e=><button  onClick={()=>onclick(e.id!)} className={clsx(' w-max font-bold px-3 mx-3   min-w-fit',current==e.id&&'border-secondary-400 border-b-4')}><span className='overflow-ellipsis'>{e.name}</span></button>)}
            </div>}
        </>
    </Fetchingdata>
  )
}
