import {FC, ReactNode} from 'react'
import { Alert } from './alert_success'
import { getWsMessage } from '../../core/features/error_transformer'
type FetchingdataProps={
isLoading?:boolean,
isError?:boolean,
isSuccess?:boolean,
error?:unknown,
children?:ReactNode
}
export const Fetchingdata:FC<FetchingdataProps> = ({isSuccess, isError, isLoading, error, children}) => {
 
  return (
  <>
  {isError && <center className='bg-rose-200 my-3 rounded-md' ><span>{getWsMessage(error)}</span></center>}
  {isLoading && <Alert type='loading' title='Chargement' message='Patientew un moment'/>}
  {isSuccess  && children}
  </>
  )
}
