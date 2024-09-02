import { Text, Button } from '@mantine/core'
import { BellAlertIcon } from '@heroicons/react/24/solid'

export const NotificationIcon = () => {
  return (
    <Button 
    variant="transparent" p={0} 
     value= {`0`}>
       <BellAlertIcon className='size-7 text-white bg-primary-500 p-0.5 rounded-full' />
      <Text className='text-lg text-primary-500  font-bold ml-1 mr-3' >{0}</Text>

     </Button>
  )
}
