import { Checkbox, Select, Textarea, TextInput } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import  {  useState } from 'react'
import { multiSelectStyle } from './custom_styles';
import { baseApi } from '../../../cores/apis/api';
import { TextConstant } from '../../../cores/constant/textConstant';

export const AddressForm = ({form,isUpdatable}:{
  form: UseFormReturnType<any, any>,
 isUpdatable?:boolean
}) => {
 
  const city=baseApi.useCityQuery()
const [update, setUpdate]=useState(false)
  return (
    <>*
    <Textarea label={"Details de la Commande"}/>
      <TextInput label={TextConstant.addressDetails}  {...form.getInputProps('address')} />
      {isUpdatable&& <Checkbox
      checked={update}
      variant="filled"
    iconColor='secondary.6'
      label="Changer l address"
      onChange={(event) => setUpdate(event.currentTarget.checked)}
    />}
    {(!isUpdatable|| update)&&  <div className='flex flex-col gap-2 '>
        <Select searchable styles={multiSelectStyle}  label={TextConstant.region} {...form.getInputProps('cityId')}   key={form.key('cityId')} data={ city.data?.data.map(e=>({label:`${e.parent?.name!} / ${e.name!}`.toLowerCase(), value:`${e.id}`})) } />
       
      </div>}
      </>
  )
}
