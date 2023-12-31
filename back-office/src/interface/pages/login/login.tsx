import { Input } from '../../components/input'
import { Logo } from '../../components/logo'
import {useForm} from "react-hook-form"
import { CustomForm } from '../../components/custom_form'
import { SignInDto, SigniInSchema } from '../../../core/models/login.dto'
import { yupResolver } from '@hookform/resolvers/yup'
import { useLoginMutation } from '../../../core/features/security.slice'
import { Navigate } from 'react-router-dom'
export const Login = () => {
  const  [ login,{isError, isSuccess, isLoading, reset}]=useLoginMutation();
  const {register,  handleSubmit,formState:{errors}}=useForm({
    resolver:yupResolver(SigniInSchema)
  })

  const _onSubmit= async (data:SignInDto)=>{
console.log(data);
await login(data);
  }
  return (
    <>
   {isSuccess&& <Navigate to="/dash"/>}
    <div   className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
         <Logo className='self-center mx-auto h-28 w-28  md:h-32 md:w32' />
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
           Se Connecter a votre compte
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <CustomForm  isError={isError} isSuccess={isSuccess} onFinish={()=>reset()}  isLoading={isLoading} onSubmit={handleSubmit(_onSubmit)}>
        
<Input label='Adresse Email' error={errors.email?.message} children={<input className='input' {...register("email")}/>}/>
<Input label='Mot de Passe'  error={errors.password?.message}  children={<input type='password' className='input' {...register("password")} />}/>
        

            
          </CustomForm>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Mot de passe oublié ?
                  </a>
                </div>
          </p>
        </div>
      </div>
    </>
  )
}
