import  { FC, ReactNode, useEffect } from 'react'
import { useLoginMutation, useProfileQuery } from '../../../cores/apis/security.slice'
import {  DialogAlert } from '../dialog'
import { Logo } from '../logo'
import { SetProfileForm } from './set_profile'
import { useForm } from '@mantine/form'
import { NumberInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
type ProtectedActionProps={
        action:()=>void,
        children:ReactNode;
}
export const ProtectedAction:FC<ProtectedActionProps> = ({children, action}) => {
  const { isSuccess:isLogin}=useProfileQuery("");
  const [showLogin, {open, close}]=useDisclosure(false)
  useEffect(() => {
    close()
  }, [isLogin])
  return (
    
    <div>
      
    {/* {IsLoginLoading && <Alert isOpen={true} type='loading'/>} */}
   <button onClick={()=>{isLogin ?action():open()}}>
   {children}
   </button>
   {showLogin && <DialogAlert onClose={()=>{console.log("-------on closee----------");close()}} isOpen={showLogin}>
    <LoginForm close={close}  action={()=>{action(); close()}}/>
    </DialogAlert>}
    </div>
  )
}

type LoginFormProps={
  action:()=>void,
  close:()=>void,
}
export const LoginForm:FC<LoginFormProps> =({action})=>{
  const [login, {isSuccess}]=useLoginMutation();
  const [opened, {open, close}]=useDisclosure()
  const form=useForm<{username:string, password:string}>({})
  const _onSubmit=form.onSubmit((data)=>{
  
    login({...data,username:'221'+data.username}).unwrap().then(result=>{
      console.log(result)
   
    })

  })
useEffect(() => {
  

 if(isSuccess==true){
  open()
 }
}, [isSuccess])

  
return (<>
 {isSuccess && <DialogAlert onClose={close} isOpen={opened}>
    <SetProfileForm  onclose={close}  action={action}></SetProfileForm>
    </DialogAlert>}
  <form onSubmit={_onSubmit} className="flex items-center flex-col md:px-10">
    <Logo />
    <span className="font-bold  title text-2xl">Connexion</span>
   
    <NumberInput label="Telephone" {...form.getInputProps("username")} prefix='221 ' className='' w={'100%'} />
    <button className="button primary">Valider</button>
  </form>
  </>
);
}