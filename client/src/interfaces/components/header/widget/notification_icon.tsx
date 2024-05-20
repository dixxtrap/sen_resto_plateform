import React from 'react'
import { HeaderIcon } from './header_icon'
import { BellAlertIcon } from '@heroicons/react/24/solid'

export const NotificationIcon = () => {
  return (
    <HeaderIcon icon={ <BellAlertIcon className='h-8 text-gray-500' />} value= {`0`}/>
  )
}
