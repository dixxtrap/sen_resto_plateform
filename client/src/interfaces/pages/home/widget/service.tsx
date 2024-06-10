
import  BanknotesIcon  from '@heroicons/react/20/solid/BanknotesIcon'
import BuildingStorefrontIcon from '@heroicons/react/24/solid/BuildingStorefrontIcon'
import CakeIcon from '@heroicons/react/24/solid/esm/CakeIcon'
import TruckIcon from '@heroicons/react/24/solid/TruckIcon'
import { Str } from '../../../../cores/constantes/str'

export const Services = () => {
    const serviceList=[
        {icon:BuildingStorefrontIcon,title:"Restauration"},
        {icon:CakeIcon,title:"Divers Plats"},
        {icon:TruckIcon,title:Str.deliver},
        {icon:BanknotesIcon,title:Str.safePaid},
    ]
  return (
    <div className='bg-white h-20 flex items-center justify-center divide-x-2  gap-3'>
    {serviceList.map(e=><div className='flex items-center gap-3 mx-4 px-4'>
      <e.icon className='text-slate-800 h-8'/> 
      <span className='hidden md:block'>
        {e.title} 
      </span>
    </div>)}
   </div>
  )
}
