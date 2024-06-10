
import { ShoppingBagIcon } from '@heroicons/react/24/solid'
import { useGetBagQuery } from '../../../../cores/apis/order.slice'
import { HeaderIcon } from './header_icon';
import { useNavigate } from 'react-router-dom';

export const BagIcon = () => {
    const {data}=useGetBagQuery('')
    const nav=useNavigate();
    const _onclick=()=>{
nav('/order')
    }  
  return (
   
      <HeaderIcon onclick={_onclick} icon={ <ShoppingBagIcon className='h-8' />} value= {`${data?.data.length}`}/>
  )
}
