import { HeaderIcon } from './header_icon'
import { BellAlertIcon } from '@heroicons/react/24/solid'

export const NotificationIcon = () => {
  return (
    <HeaderIcon icon={ <BellAlertIcon className='h-8 ' />} value= {`0`}/>
  )
}
