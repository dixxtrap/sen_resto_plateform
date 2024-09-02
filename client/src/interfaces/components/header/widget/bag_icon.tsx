
import { ShoppingBagIcon } from '@heroicons/react/24/solid'
import { useGetBagQuery } from '../../../../cores/apis/order.slice'

import { Link } from 'react-router-dom';
import {  Button, Text } from '@mantine/core';

export const BagIcon = () => {
    const {data}=useGetBagQuery('')
 

  return (
   <Button component={Link} to={"/order"} variant="transparent" p={0} radius={2}>
    
        <ShoppingBagIcon  className='size-7 text-white bg-primary-500 p-0.5 rounded-full' />
      
     
      <Text className='text-lg text-primary-500  font-bold ml-1 mr-3' >{data?.data.length}</Text>
      </Button>
  )
}
