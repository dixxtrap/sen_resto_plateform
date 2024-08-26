import { PasswordInput, TextInput } from "@mantine/core"
import { CustomForm } from "../../components/custom_form"
import { multiSelectStyle } from "../../components/form/custom_styles"
import { AddressForm } from "../../components/form/address_form"
import { TextConstant } from "../../../core/data/textConstant"
import { useForm } from "@mantine/form"
import { deliverApi } from "../../../core/features/deliver.slice"

export const DeliverCreate = () => {
  const [create, status]=deliverApi.useCreateMutation();
    const form=useForm()
    const _onsubmit=form.onSubmit((data)=>{
      console.log(data)
      create(data)
    })
    return (<CustomForm 
        title={"Creation d'un livreur"}
        {...status}
         onSubmit={_onsubmit}>
          <TextInput label={TextConstant.firstname} {...{key:form.key('firstname'), ...form.getInputProps('firstname') , error:form.errors['firstname']}} />
          <TextInput label={TextConstant.lastname} {...{key:form.key('lastname'), ...form.getInputProps('lastname') , error:form.errors['lastname']}} />
          <TextInput label={TextConstant.phone} {...{key:form.key('phone'), ...form.getInputProps('phone') , error:form.errors['phone']}} />
        <TextInput  label="Numéro d'Immatriculation" {...form.getInputProps("email")} />

          <PasswordInput styles={multiSelectStyle} label={TextConstant.password}  {...{key:form.key('password'), ...form.getInputProps('password') , error:form.errors['password']}}/>
          <AddressForm form={form}  />
        </CustomForm>)
  }