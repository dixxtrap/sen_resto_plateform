import { useForm } from '@mantine/form'
import { Logo } from '../logo'
import { Button } from '@mantine/core'
import { securityApi } from '../../../cores/apis/security.slice'
import { useEffect } from 'react'
import { CustomForm } from '../custom_form'

export const PinVerification = ({phone, onSucess}:{phone:string, onSucess:()=>void}) => {
  const [verification,verficationState]=securityApi.useOtpVerificationMutation()
    const form=useForm({
        initialValues:{
            username:phone,
            password:"",
        }
    })
    const _onSubmit=form.onSubmit((value)=>{
      verification({to:"221"+phone,code:value.password })
    })
    useEffect(() => {
      if(verficationState.isSuccess) onSucess();
    }, [verficationState.isSuccess])
    
  return (
    <CustomForm btnClassName='hidden' {...verficationState} successPath='.' onSubmit={_onSubmit} >
    <div className='flex items-center flex-col justify-center'>
    <Logo className='size-32' />
    <span className="font-bold  text text-2xl">{import.meta.env.VITE_APP_NAME}</span>
    <span>
      {phone}
    </span>
    </div>
    
   <label htmlFor='password' className='relative my-3 flex items-center justify-center' >
   <input type='number' autoFocus={true}   placeholder="Code  Pin"    {...form.getInputProps("password")} key={form.key("password")}  name='password' id='password' className='rounded-lg m-4 ' />
  <div className='flex z-50 bg-white w-full py-4  absolute items-center justify-center  gap-3'>
  {new Array(4).fill(0).map((_, i)=>(<div className='size-10  rounded-md content-center flex items-center justify-center ring ring-slate-800'>
      {form.getValues().password.length>i&& <div className='size-4 ring rounded-full  ring-slate-800'></div>}
      {form.getValues().password.length==i&& <div className='w-[0.3px] h-5 animate-pulse   duration-0 ring-slate-800 bg-slate-800 ring-1 '></div>}
    </div>))}
  </div>
   
  
   </label>
    <Button color={"primary.5"} w={"100%"} type='submit' radius={80} fw={400} className="  px-5">Valider</Button>
  </CustomForm>
  )
}
