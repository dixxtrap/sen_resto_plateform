import { Textarea } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { TextConstant } from '../../../core/data/textConstant'


export const AppTextarea = ({form}:{form :UseFormReturnType<any,any>}) => {
  return (
    <Textarea  classNames={{input:'bgInput '}} label={TextConstant.description} {...form.getInputProps("description")} error={form.errors["description"]} key={form.key("description")} />
  )
}
