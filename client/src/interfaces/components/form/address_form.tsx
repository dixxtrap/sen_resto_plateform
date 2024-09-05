import { Checkbox, Select, TextInput } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import  {  useState } from 'react'
import { multiSelectStyle } from './custom_styles';
import { baseApi } from '../../../cores/apis/api';
import { TextConstant } from '../../../cores/constant/textConstant';

export const AddressForm = ({form,isUpdatable}:{
  form: UseFormReturnType<any, any>,
 isUpdatable?:boolean
}) => {
  const region=baseApi.useGetRegionQuery('')
  const city=baseApi.useGetChildrenQuery(form.getValues().regionId)
  const arrondissment=baseApi.useGetChildrenQuery(form.getValues().departementId)
  const commune = baseApi.useGetChildrenQuery(form.getValues().municipalityId )
const [update, setUpdate]=useState(false)
  return (
    <>
      <TextInput label={TextConstant.address}  {...form.getInputProps('address')} />
      {isUpdatable&& <Checkbox
      checked={update}
      variant="filled"
    iconColor='secondary.6'
      label="Changer l address"
      onChange={(event) => setUpdate(event.currentTarget.checked)}
    />}
    {(!isUpdatable|| update)&&  <div className='flex flex-col gap-2 '>
        <Select styles={multiSelectStyle}  label={TextConstant.region} {...form.getInputProps('regionId')}   key={form.key('regionId')} data={ region.data?.data.map(e=>({label:e.name!, value:`${e.id}`})) } />
        { <Select styles={multiSelectStyle}   label={TextConstant.city}  {...form.getInputProps('departementId')}  key={form.key('departementId')}  data={ city.data?.data.map(e=>({label:e.name!, value:`${e.id}`})) }/>}
        <Select styles={multiSelectStyle}   label={TextConstant.district} {...form.getInputProps('municipalityId')}  key={form.key('municipalityId')} data={ arrondissment.data?.data.map(e=>({label:e.name!, value:`${e.id}`})) }/>
          <Select styles={multiSelectStyle}   label={TextConstant.municipality}  {...form.getInputProps('cityId')}  key={form.key('cityId')} data={ commune.data?.data.map(e=>({label:e.name!, value:`${e.id}`})) }/>
      </div>}
      </>
  )
}
