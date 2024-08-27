import { NumberInput, TextInput } from "@mantine/core"
import { CustomForm } from "../../components/custom_form"

import { useCreateGiftMutation } from "../../../core/features/gift.slice"
import { useForm } from "@mantine/form"

import { TextConstant } from "../../../core/data/textConstant"
import { CustomSwitchInput } from "../../components/switch"

export const GiftCreate = () => {

const [createGift, { isError, isSuccess, isLoading, error, data, reset }] =
  useCreateGiftMutation();
  const form = useForm({
    initialValues: {
    isActive:true
  }
});
const _onSubmit = form.onSubmit((body) => {
  console.log(body);
  createGift({ ...body });
});
  return (

    <CustomForm
    title="Gift"
    subTitle="Création d'une remise"
    isError={isError}
    isSuccess={isSuccess}
    isLoading={isLoading}
    error={error}
    successMessage={data?.message ?? ""}
    onSubmit={_onSubmit}
    onFinish={reset}
  >
   
  <TextInput label={TextConstant.description} {...form.getInputProps("description")} error={form.errors["description"]} key={form.key("description")} />

   
  <NumberInput label={TextConstant.reduction} suffix="%" {...form.getInputProps("discount")} error={form.errors["discount"]} key={form.key("discount")} />

  <CustomSwitchInput itemKey="isActive" form={form}/>


    
  </CustomForm>
  )
}
