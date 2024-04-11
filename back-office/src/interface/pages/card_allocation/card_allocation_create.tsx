import React from 'react'
import { useGetCompanyChildrenQuery } from '../../../core/features/company.slice'
import { CustomForm } from '../../components/custom_form'
import { Input } from '../../components/input'
import { useForm } from 'react-hook-form'
import { clsx } from '../../utils/clsx'
import { CardAllocationSchema } from '../../../core/models/card_allocation.dto'
import { useCreateAllocationMutation } from '../../../core/features/card_allocation.slice'
import { getWsMessage } from '../../../core/features/error_transformer'

export const CardAllocationCreate = () => {
    const{data:children}=useGetCompanyChildrenQuery('');
    const [create ,{isLoading, isError, isSuccess, error, reset}]=useCreateAllocationMutation()
    const {register, handleSubmit,formState:{errors}}=useForm({resolver:CardAllocationSchema})
    const _onsubmit=handleSubmit((data)=>{
        
        console.log(data);
        create(data);
    })
  return (
   <CustomForm successPath='/card' onFinish={reset} onSubmit={_onsubmit} isError={isError} error={getWsMessage(error)} isSuccess={isSuccess}  isLoading={isLoading} confirmeBefore={true}  >
    <Input label='label' error={errors.label?.message}>
    <input className='input' {...register("label")}/>
    </Input>
    <Input label='Description' error={errors.motif?.message}>
    <input className='input' {...register("motif")}/>
    </Input>
    <Input label='Nombre de carte' error={errors.quantity?.message}>
    <input className='input' {...register("quantity")}/>
    </Input>
    <Input label="Recepteur" error={errors.receiverId?.message}>
          <select
            className={clsx("input", "lowercase", "h-9")}
            {...register("receiverId")}
          >
            {children?.data.map((e) =><option value={e.id}>{e.name}</option>)}
          </select>
        </Input>
   </CustomForm>
  )
}
