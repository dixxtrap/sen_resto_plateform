import { useForm } from "@mantine/form";
import { deliverApi } from "../../../core/features/deliver.slice";
import { useParams } from "react-router-dom";
import { DeliverDto } from "../../../core/models/deliver.dto";
import { CustomForm } from "../../components/custom_form";
import { TextInput } from "@mantine/core";
import { TextConstant } from "../../../core/data/textConstant";
import { useEffect } from "react";
import { PlaceAddressForm } from "../../components/form/google_place_address";

export const DeliverEdit = () => {
  const { id } = useParams();
  const [update, state] = deliverApi.useUpdateDeliverMutation();
  const { data: old, ...oldState } = deliverApi.useGetByIdQuery(id!);
  const form = useForm<DeliverDto>({initialValues:{location:{latitude:0, longitude:0}}});
  console.log(old);

  const _onsubmit = form.onSubmit((data) => {
    console.log(data);
    update({ id: id!, body: data as DeliverDto });
  });
  useEffect(() => {
    console.log(old)
   if(oldState.isSuccess===true){
    form.setValues({
      displayname:old?.data.displayname,
      
      phone:old?.data.phone,
      email:old?.data.email,
      address:old?.data.address,
      location:{...old?.data.location!},
    })
   }
  }, [oldState.isSuccess])
  
  return (
    <CustomForm
      title={"Modifier  les infos du livreur"}
      {...state}
      isLoading={oldState.isLoading || state.isLoading}
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
        {...{
          key: form.key("externalId"),
          ...form.getInputProps("externalId"),
          error: form.errors["externalId"],
        }}
      />
      <PlaceAddressForm form={form} />
    </CustomForm>
  );
};
