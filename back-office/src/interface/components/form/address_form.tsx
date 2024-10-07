import { Checkbox, Select, TextInput } from '@mantine/core'
import { useForm, UseFormReturnType } from '@mantine/form'
import  {  useState } from 'react'
import { TextConstant } from '../../../core/data/textConstant'
import { cityApi } from '../../../core/features/city.slice'
import { multiSelectStyle } from './custom_styles';

export const AddressForm = ({form,isUpdatable,className}:{
  form: UseFormReturnType<any, any>,
 isUpdatable?:boolean,
 className?:string
}) => {
  const f2= useForm()
  const region=cityApi.useGetRegionQuery('')
  const city=cityApi.useGetDepartementQuery(f2.getValues().regionId)
  const arrondissment=cityApi.useGetDepartementQuery(f2.getValues().departementId)
  const commune = cityApi.useGetDepartementQuery(f2.getValues().municipalityId )
const [update, setUpdate]=useState(false)
  return (
    <>
     {isUpdatable || update&& <TextInput label={TextConstant.address}  {...form.getInputProps('address')} />}
      {isUpdatable&& <Checkbox
      checked={update}
      variant="filled"
    iconColor='secondary.6'
      label="Changer l address"
      onChange={(event) => setUpdate(event.currentTarget.checked)}
    />}
    {(!isUpdatable|| update)&&  <div className={className??'grid grid-cols-1  gap-x-8 gap-y-3 lg:grid-cols-2'}>
        <Select styles={multiSelectStyle} label={TextConstant.region} {...f2.getInputProps('regionId')}   key={f2.key('regionId')} data={ region.data?.data.map(e=>({label:e.name!, value:`${e.id}`})) } />
        { <Select styles={multiSelectStyle}   label={TextConstant.city}  {...f2.getInputProps('departementId')}  key={f2.key('departementId')}  data={ city.data?.data.map(e=>({label:e.name!, value:`${e.id}`})) }/>}
        <Select styles={multiSelectStyle}   label={TextConstant.district} {...f2.getInputProps('municipalityId')}  key={f2.key('municipalityId')} data={ arrondissment.data?.data.map(e=>({label:e.name!, value:`${e.id}`})) }/>
          <Select styles={multiSelectStyle}   label={TextConstant.municipality}  {...form.getInputProps('cityId')}  key={form.key('cityId')} data={ commune.data?.data.map(e=>({label:e.name!, value:`${e.id}`})) }/>
      </div>}
      </>
  )
}
