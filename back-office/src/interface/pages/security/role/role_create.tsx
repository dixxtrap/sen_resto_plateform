
import { useCreateRoleMutation } from '../../../../core/features/role.slice'
import { CustomForm } from '../../../components/custom_form'
import { Input } from '../../../components/input'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { roleSchema } from '../../../../core/models/role.dto'
import { useParams } from 'react-router-dom'

export const RoleCreate = () => {
  const id=parseInt(useParams().id!)
  const [create, {isLoading, isSuccess, isError}]=useCreateRoleMutation()
  const {register,handleSubmit,formState:{errors}}=useForm({resolver:yupResolver(roleSchema)})
  const _onsubmit=handleSubmit((data)=>{
    console.log(data)
    create({...data, parent:{id}})
  })
  return (
   <CustomForm 
   onSubmit={_onsubmit}
   isError={isError}
   isSuccess={isSuccess}
   isLoading={isLoading}
   >
    <Input label='Code' error={errors.code?.message!}>
    <input className='input' {...register("code")}/>
    </Input>
    <Input label='name' error={errors.name?.message!}>
    <input className='input' {...register("name")} />
   
    </Input>
    <Input label='Description' error={errors.description?.message!}> 
    <textarea  className='input' {...register("description")}/>
   
    </Input>
    
    
   </CustomForm>
  )
}
