import {FC, ReactNode} from 'react'

import {Modal,Text} from "@mantine/core"
import SunIcon from '@heroicons/react/24/outline/SunIcon'
import LightBulbIcon from '@heroicons/react/24/outline/LightBulbIcon'
import CheckIcon from '@heroicons/react/24/outline/CheckIcon'
import { useDisclosure } from '@mantine/hooks'
import { modalStyleProps } from '../../utils/custom_styles'
type AlertProps={
        title?:string,
        message?:string,
        isOpen?:boolean,
        type?:"succeedded"|"loading"|"faillure"|"info"
        onClose?:(()=>void)
}
export const Alert :FC<AlertProps> =   ({isOpen=true, message, title, type}) => {

const [opened,{close}]=useDisclosure(isOpen)


  return (
 
  <Modal opened={opened} title={  <Text size='xl' className="text-2xl  font-semibold leading-6 ">
    {title}
    </Text>} withCloseButton={type==="faillure"} classNames={{body:'bgInput', header:"bgInput"}}  onClose={close} >

                <div>
                  {type==="succeedded"&&<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                  </div>}
                  {type==="loading"&&<div className="mx-auto animate-spin flex h-12 w-12 items-center justify-center rounded-full bg-sky-100">
                    <SunIcon className="h-6 w-6 text-sky-600" aria-hidden="true" />
                  </div>}
                  {type==="info"&&<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sky-100">
                    <LightBulbIcon className="h-6 w-6 text-sky-600" aria-hidden="true" />
                  </div>}
                  {type==="faillure"&&<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-100">
                    <CheckIcon className="h-6 w-6 text-rose-600" aria-hidden="true" />
                  </div>}
                  <div className="mt-3 text-center sm:mt-5">
                  
                    <div className="mt-2">
                      <p className="text-sm text-gray-400 dark:text-kdark-text">
                      {message}
                      </p>
                    </div>
                  </div>
                </div>
             
    </Modal>

  
  )
}

export type DialogProps={
  children:ReactNode;
   isOpen:boolean;
    onClose:()=>void
}

export const DialogAlert :FC<DialogProps> =   ({isOpen=true,onClose,children}) => {
 
  
return (
 
  <Modal opened={isOpen} {...modalStyleProps}  onClose={()=>onClose()}>

      <div className='z-[1000]'>
              {children}
              </div>
          
         
    </Modal>
  

)
}
