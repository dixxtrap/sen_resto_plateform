import { Checkbox, Select, TextInput } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import  {  useState } from 'react'
import { TextConstant } from '../../../core/data/textConstant'
import { cityApi } from '../../../core/features/city.slice'
import { multiSelectStyle } from './custom_styles';

export const AddressForm = ({form,isUpdatable,className}:{
  form: UseFormReturnType<any, any>,
 isUpdatable?:boolean,
 className?:string
}) => {
  const region=cityApi.useGetRegionQuery('')
  const city=cityApi.useGetDepartementQuery(form.getValues().regionId)
  const arrondissment=cityApi.useGetDepartementQuery(form.getValues().departementId)
  const commune = cityApi.useGetDepartementQuery(form.getValues().municipalityId )
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
        <Select styles={multiSelectStyle} label={TextConstant.region} {...form.getInputProps('regionId')}   key={form.key('regionId')} data={ region.data?.data.map(e=>({label:e.name!, value:`${e.id}`})) } />
        { <Select styles={multiSelectStyle}   label={TextConstant.city}  {...form.getInputProps('departementId')}  key={form.key('departementId')}  data={ city.data?.data.map(e=>({label:e.name!, value:`${e.id}`})) }/>}
        <Select styles={multiSelectStyle}   label={TextConstant.district} {...form.getInputProps('municipalityId')}  key={form.key('municipalityId')} data={ arrondissment.data?.data.map(e=>({label:e.name!, value:`${e.id}`})) }/>
          <Select styles={multiSelectStyle}   label={TextConstant.municipality}  {...form.getInputProps('cityId')}  key={form.key('cityId')} data={ commune.data?.data.map(e=>({label:e.name!, value:`${e.id}`})) }/>
      </div>}
      </>
  )
}
