import { Textarea, TextInput } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { TextConstant } from '../../../core/data/textConstant'


export const AppTextarea = ({form}:{form :UseFormReturnType<any,any>}) => {
  return (
    <Textarea  classNames={{input:'bgInput '}} label={TextConstant.description} {...form.getInputProps("description")} error={form.errors["description"]} key={form.key("description")} />
  )
}
export const FormTextInput=({form,label, field}:{form :UseFormReturnType<any,any>, label:string,field:string})=>{
  return <TextInput label={label} {...form.getInputProps(field)} error={form.errors[field]}  key={form.key(field)}/>
}