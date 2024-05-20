import React, { FC, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
type HeaderIconProps={
    icon:ReactNode,
    value:string,
    onclick?:()=>void
}
export const HeaderIcon:FC<HeaderIconProps> = ({icon, value, onclick}) => {
 
    return (
    <button onClick={onclick} className='relative  mx-2 flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2'>
        <span className="absolute -inset-1.5" />
   <div className='flex  py-1 items-start justify-center'>
   
                 
                 {icon}
                  <div className='font-semibold -mt-2 -ml-2 bg-secondary-400  aspect-square w-6 content-center rounded-full text-slate-100 text-sm'>
               <span>  {value}</span>
                  </div>
   </div>
    </button>
  )
}
