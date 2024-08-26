
import { useGetCompanyChildrenQuery } from '../../../core/features/company.slice'
import { CustomForm } from '../../components/custom_form'
import { useForm } from '@mantine/form'
import { clsx } from '../../utils/clsx'
import { useCreateAllocationMutation } from '../../../core/features/card_allocation.slice'
import { getWsMessage } from '../../../core/features/error_transformer'
import { Select, TextInput } from '@mantine/core'

export const CardAllocationCreate = () => {
    const{data:children}=useGetCompanyChildrenQuery('');
    const [create ,{isLoading, isError, isSuccess, error, reset}]=useCreateAllocationMutation()
    const form=useForm()
    const _onsubmit=form.onSubmit((data)=>{
        
        console.log(data);
        create(data);
    })
  return (
   <CustomForm title='Transfert de carte' successPath='/card' onFinish={reset} onSubmit={_onsubmit} isError={isError} error={getWsMessage(error)} isSuccess={isSuccess}  isLoading={isLoading} confirmeBefore={true}  >
    
      <TextInput  className='input' {...form.getInputProps("label")}/>
    
    
      <TextInput label=":otif" className='input' {...form.getInputProps("motif")}/>
   

      <TextInput label="Quantity" className='input' {...form.getInputProps("quantity")}/>
   
 
          <Select
            className={clsx("input", "lowercase", "h-9")}
        {...form.getInputProps("receiverId")}
        data={children?.data.map((e)=>({label:`${e.name} /${e.shortname}`, value:`${e.id}`}) )}
          >
          </Select>
       
   </CustomForm>
  )
}
