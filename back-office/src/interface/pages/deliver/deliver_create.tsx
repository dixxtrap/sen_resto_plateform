import {  TextInput } from "@mantine/core";
import { CustomForm } from "../../components/custom_form";
import { TextConstant } from "../../../core/data/textConstant";
import { useForm } from "@mantine/form";
import { deliverApi } from "../../../core/features/deliver.slice";
import { PlaceAddressForm } from "../../components/form/google_place_address";

export const DeliverCreate = () => {
  const [create, status] = deliverApi.useCreateMutation();
  const form = useForm();
  const _onsubmit = form.onSubmit((data) => {
    console.log(data);
    create(data);
  });
  return (
    <CustomForm
      title={"Creation d'un livreur"}
      {...status}
      onSubmit={_onsubmit}
    >
      <TextInput
        label={TextConstant.firstname}
        {...{
          key: form.key("firstname"),
          ...form.getInputProps("firstname"),
          error: form.errors["firstname"],
        }}
      />
      <TextInput
        label={TextConstant.lastname}
        {...{
          key: form.key("lastname"),
          ...form.getInputProps("lastname"),
          error: form.errors["lastname"],
        }}
      />
      <TextInput
        label={TextConstant.phone}
        {...{
          key: form.key("phone"),
          ...form.getInputProps("phone"),
          error: form.errors["phone"],
        }}
      />
      <TextInput
        label="Numéro d'Immatriculation"
        {...form.getInputProps("email")}
      />

      
      <PlaceAddressForm form={form} />
    </CustomForm>
  );
};
