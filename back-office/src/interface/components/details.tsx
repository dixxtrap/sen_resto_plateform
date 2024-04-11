import React, { FC, ReactNode } from 'react'
import { Alert } from './alert_success'
import { Title } from './title'
import { DetailItem } from './details_item'
import { getWsMessage } from '../../core/features/error_transformer'
type DetailsProps={
    isSuccess?:boolean,
    isError?:boolean,
    isLoading?:boolean,
    error?:unknown,
    title?:string,
    subtitle?:string,
    children:ReactNode
}
export const Details:FC<DetailsProps> = ({isError,subtitle, title,isSuccess, isLoading, error, children}) => {
  return (<>
    {isLoading&&<Alert isOpen={isLoading}  type='loading'/>}
    {isError&&<Alert isOpen={isError}  message={getWsMessage(error)} type='faillure'/>}
    {isSuccess &&!isLoading&&<div className='flex flex-col divide-y darkDivider'>
        {title && <Title title={title} subTitle={subtitle}/>}
      {children}
            
      </div>}
      </>
  )
}
