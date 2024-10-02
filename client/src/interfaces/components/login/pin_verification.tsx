import { useForm } from '@mantine/form'
import { Logo } from '../logo'
import { Button, NumberInput, PasswordInput } from '@mantine/core'
import { securityApi } from '../../../cores/apis/security.slice'
import { useEffect } from 'react'

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
    <form onSubmit={_onSubmit} className="flex items-center flex-col gap-3  md:px-10">
    <Logo />
    <span className="font-bold  title text-2xl">{import.meta.env.VITE_REACT_APP_NAME}</span>
   
    <NumberInput placeholder="Telephone" rightSection={<div></div>} {...form.getInputProps("username")} readOnly prefix='221 '  radius={80} className='rounded-lg' w={'100%'} />
    <PasswordInput  placeholder="Code Pin"   {...form.getInputProps("password")}  radius={80} className='rounded-lg' w={'100%'} />
    <Button color={"primary.5"} w={"100%"} type='submit' radius={80} fw={400} className="  px-5">Valider</Button>
  </form>
  )
}
