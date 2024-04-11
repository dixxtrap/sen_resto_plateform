import React from 'react'
import { Str } from '../../cores/constantes/str'
import { ImgAssets } from '../../cores/constantes/img'

export const FastDeliver = () => {
  return (
    <div className='bg-gray-50  py-12 md:py-16 flex flex-wrap  items-center relative'>
    <div className='flex   max-w-7xl mx-auto items-start'>
    <img src={ImgAssets.deliver} className='illus  left    desc  ring-1 ring-inset ring-primary-100 '  title='deliver'/>
    <div className='w-10'></div>
    <div className='flex  flex-col'>
     <span className='title1 text-gray-800'>{Str.deliver}</span>
     <span className='subtitle1 desc'>{Str.deliverDesc}</span>
    </div>
    </div>
  
      <img src="src/assets/svg/Groupflower5.svg" alt="" className='w-[200px] md:w-[500px] absolute right-0 '/>
    
    </div>
  )
}
