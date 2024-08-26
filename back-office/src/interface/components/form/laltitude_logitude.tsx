import { NumberInput } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { TextConstant } from '../../../core/data/textConstant'
import { FC } from 'react'
type LaltitudeLongituide = {
    form :UseFormReturnType<any,any>
}
export const LaltitudeLongituide:FC<LaltitudeLongituide> = ({form}) => {
  return (
    <div className="flex gap-8  w-full flex-wrap">
         
      <NumberInput className='grow' label={TextConstant.laltitude} {...form.getInputProps("location.latitude")} error={form.errors["location.latitude"]}  key={form.key("location.latitude")} />

         
        <NumberInput className='grow' label={TextConstant.longitude} value={form.values.location?.longitude}
        onChange={(value) => form.setFieldValue('location.longitude', value)} error={form.errors["location.longitude"]} key={form.key("location.longitude")} />

        </div>
  )
}
