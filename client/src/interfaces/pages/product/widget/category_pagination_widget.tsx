import  { FC } from 'react'

import { useGetCategoryBaseQuery, useGetCategoryQuery, useGetCompanyQuery } from '../../../../cores/apis/api'
import { Fetchingdata } from '../../../components/fetching_data'
import { Carousel } from '@mantine/carousel';
import { Pill, Select, TextInput } from '@mantine/core'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useForm } from '@mantine/form';
import clsx from 'clsx';
type CategoryPageniationWidgetProps={
  current:number,
  onclick:(id:number)=>void
}
export const CategoryPageniationWidget:FC<CategoryPageniationWidgetProps>= () => {
const category=useGetCategoryQuery('')
const categoryBase=useGetCategoryBaseQuery('')
const company=useGetCompanyQuery()
const form=useForm({initialValues:{
  baseId:'',
  categoryIds:["1", "4"]
}})
  return (
    <Fetchingdata {...category}>
        <div className='sticky bg-white border-b border-gray-500/40   -top-1 z-50'>
        <div className="flex  w-full gap-2  content-center">
            <Select label="Categori" data={categoryBase.data?.data.map(c=>({label:c.name! ,value:`${c.id}`}))}>

            </Select>
            <Select label="Restaurant" data={company.data?.data.map(c=>({label:c.name! ,value:`${c.id}`}))}>

            </Select>
            <div className='grow'></div>
            <TextInput label="Produit" leftSection={<MagnifyingGlassIcon className='size-4'/>} placeholder='chercher'/>
         
              
            </div>
        { <Carousel
      
      height={40}
      p={10}
      pt={20}
      slideSize={{base:'', xs:'30',sm:'75px', lg:'30px'}}
      slideGap="md"
      withControls={false}
      align="start"
      slidesToScroll={3}
      
    >
     {category.data?.data.map(c=>{
      const isActive=form.getValues().categoryIds.some(e=>e===`${c.id}`)
      return <Carousel.Slide> <Pill color={"teal"} fw={400}  className={clsx({'bg-primary-500  text-white':isActive})}  onRemove={()=>{form.insertListItem('categoryIds',`${c.id}`)}} size='lg'  onClick={()=>{isActive?form.removeListItem('categoryIds',form.getValues().categoryIds.findIndex(e=>e===`${c.id}`)):form.insertListItem('categoryIds',`${c.id}`)}}>{c.name}</Pill></Carousel.Slide>
     })}

      {/* ...other slides */}
    </Carousel>
}
        </div>
    </Fetchingdata>
  )
}
