
import { NumberInput } from '@mantine/core'
import { City } from '../../../../core/models/city.dto'
import { TextConstant } from '../../../../core/data/textConstant'
import { useForm } from '@mantine/form'
import { cityApi } from '../../../../core/features/city.slice'
import { CustomForm } from '../../../components/custom_form'

export const SetLatLng = ({city}:{city:City }) => {
    const [update, updateState]=cityApi.useUpdateMutation()
    const form=useForm({initialValues:{
        latitude:city.latitude,
        longitude:city.longitude,
    }})
   const  onSubmit=form.onSubmit((data)=>{
console.log(data)
update({id:city.id!, city:data})
   })
  return (
    <div>
        <CustomForm  successPath='.' {...updateState} onSubmit={onSubmit}>
        <NumberInput key={form.key("latitude")} {...form.getInputProps("latitude")} label={TextConstant.laltitude}/>
        <NumberInput key={form.key("longitude")} {...form.getInputProps("longitude")} label={TextConstant.longitude}/>
        </CustomForm>
    </div>
  )
}
