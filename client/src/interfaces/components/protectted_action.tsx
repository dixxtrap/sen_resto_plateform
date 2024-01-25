import React, { FC, ReactNode, useEffect, useState } from 'react'
import { useLoginMutation, useProfileQuery } from '../../cores/apis/security.slice'
import { Alert, DialogAlert } from './dialog'
import { Input } from './input'
import { useForm } from 'react-hook-form'
import { Logo } from './logo'
type ProtectedActionProps={
        action:()=>void,
        children:ReactNode;
}
export const ProtectedAction:FC<ProtectedActionProps> = ({children, action}) => {
  const {data:profile, isLoading:IsLoginLoading, isSuccess:isLogin}=useProfileQuery("");
  const [showLogin, setShowLogin]=useState(false)
  useEffect(() => {
    setShowLogin(false)
  }, [isLogin])
  return (
    
    <div>
      
    {/* {IsLoginLoading && <Alert isOpen={true} type='loading'/>} */}
   <button onClick={()=>{isLogin ?action():setShowLogin(true)}}>
   {children}
   </button>
   {showLogin && <DialogAlert onClose={()=>{console.log("-------on closee----------");setShowLogin(false)}} isOpen={showLogin}>
    <LoginForm  action={()=>{action(); setShowLogin(false)}}/>
    </DialogAlert>}
    </div>
  )
}

type LoginFormProps={
  action:()=>void,
}
export const LoginForm:FC<LoginFormProps> =({action})=>{
  const [login, {isLoading, isSuccess}]=useLoginMutation();
  const {register, handleSubmit }=useForm<{username:string, password:string}>({})
  const _onSubmit=handleSubmit((data)=>{
    console.log(data)
    login(data).unwrap().then(result=>{
      console.log(result)
      action();
    })

  })

  
return( <form onSubmit={_onSubmit} className='flex items-center flex-col md:px-10'>
  <Logo/>
  <span className='font-bold  title text-2xl'>Connexion</span>
<Input label='Telephone'>
  <input {...register("username")}  className='input'/>
  <button className='button primary'>Valider</button>
</Input>
</form>);
}