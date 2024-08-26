
import { CustomForm } from "../../components/custom_form";
import {
  useCreateRestaurantMutation,
} from "../../../core/features/restaurant.slice";
import { useForm } from "@mantine/form";
import { CompanyDto } from '../../../core/models/company.dto';
import {   TextInput } from "@mantine/core";
import { TextConstant } from "../../../core/data/textConstant";
import { TimeInput } from "@mantine/dates";
import { LaltitudeLongituide } from "../../components/form/laltitude_logitude";
import { AddressForm } from "../../components/form/address_form";
import { AppTextarea } from "../../components/form/app_textarea";

export const RestaurantCreate = () => {
  const [create, { isError, isLoading, isSuccess, reset }] =
    useCreateRestaurantMutation();
  const form = useForm<CompanyDto>({
    initialValues:{
      openingTime:"08:00",
      closingTime:"23:00",
      location:{
        latitude:0,
        longitude:0
      }
    },
    
  });
  const _onSubmit = form.onSubmit((body) => {
    console.log(`-------------------${body.description}`);
    console.log(body);
    create({ ...body });
  });
  return (
    <>
    <CustomForm
      title="Restaurant"
      isError={isError}
      isLoading={isLoading}
      isSuccess={isSuccess}
      subTitle={" Creer un nouveau restaurant"}
      onSubmit={_onSubmit}
     onFinish={reset}
    >
      
    
      <TextInput label={TextConstant.name} {...form.getInputProps("name")} error={form.errors["name"]} key={form.key("name")} />

     
      <TextInput label={TextConstant.shortname} {...form.getInputProps("shortname")} error={form.errors["shortname"]} key={form.key("shortname")} />

      
      <TextInput label={TextConstant.email} {...form.getInputProps("email")} error={form.errors["email"]} key={form.key("email")} />

     
      <TextInput label={TextConstant.phone} {...form.getInputProps("phone")} error={form.errors["phone"]} key={form.key("phone")} />

     
    

      <AppTextarea form={form} />
        <AddressForm form={form } />
        <LaltitudeLongituide form={ form} />
      <div className="flex gap-8 w-full flex-wrap">
        
      <TimeInput label={"Ouverture"} {...form.getInputProps("openingTime")} error={form.errors["openingTime"]} key={form.key("openingTime")} />
      <TimeInput label={"Fermuture"} {...form.getInputProps("closingTime")} error={form.errors["closingTime"]} key={form.key("closingTime")} />

  
      </div>
    </CustomForm >
      </>
  );
};
