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
        label={TextConstant.displayname}
        {...{
          key: form.key("displayname"),
          ...form.getInputProps("displayname"),
          error: form.errors["displayname"],
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
        label={TextConstant.email}
        {...{
          key: form.key("email"),
          ...form.getInputProps("email"),
          error: form.errors["email"],
        }}
      />
      <TextInput
        label="Numéro d'Immatriculation"
        {...form.getInputProps("externalId")}
      />

      
      <PlaceAddressForm form={form} />
    </CustomForm>
  );
};
