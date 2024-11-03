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
      firstname:old?.data.firstname,
      lastname:old?.data.lastname,
      phone:old?.data.phone,
      email:old?.data.email,
      address:old?.data.address,
      location:{...old?.data.location!},
    })
   }
  }, [oldState.isSuccess])
  
  return (
    <CustomForm
      title={"Creation d'un livreur"}
      {...state}
      isLoading={oldState.isLoading || state.isLoading}
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
