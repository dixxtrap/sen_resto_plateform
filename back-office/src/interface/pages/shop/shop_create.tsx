
import { CustomForm } from "../../components/custom_form";
import {
  shopApi,
  
} from "../../../core/features/shop.slice";
import { useForm } from "@mantine/form";
import {  ShopDto } from '../../../core/models/company.dto';
import {   TextInput } from "@mantine/core";
import { TextConstant } from "../../../core/data/textConstant";
import { TimeInput } from "@mantine/dates";
import { AppTextarea } from "../../components/form/app_textarea";
import { ImgWithHandler } from "../../components/img_with_handler";
import { handlePreviewV2 } from "../../utils/handle_preview";
import { PlaceAddressForm } from "../../components/form/google_place_address";

export const ShopCreate = () => {
  const [create, { isError, isLoading, isSuccess, reset }] =
    shopApi.useCreateShopMutation();
    const background=handlePreviewV2({});
  const form = useForm<ShopDto>({
    initialValues:{
     
      location:{
        latitude:0,
        longitude:0
      }
    },
    
  });
  const _onSubmit = form.onSubmit((body) => {
    console.log(`-------------------${body}`);
    console.log(body);
    create({ restos:{...body,  } ,background: background.file!});
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
       <ImgWithHandler htmlFor="Couverture" {...background }/>
          
      <TextInput label={TextConstant.names} {...form.getInputProps("name")} error={form.errors["name"]} key={form.key("name")} />

     
      <TextInput label={TextConstant.phone} {...form.getInputProps("phone")} error={form.errors["phone"]} key={form.key("phone")} />

      


     
    

      <AppTextarea form={form} />
        <PlaceAddressForm  form={form}/>
      <div className="flex gap-8 w-full flex-wrap">
        
      <TimeInput label={"Ouverture"} {...form.getInputProps("openingTime")} error={form.errors["openingTime"]} key={form.key("openingTime")} />
      <TimeInput label={"Fermuture"} {...form.getInputProps("closingTime")} error={form.errors["closingTime"]} key={form.key("closingTime")} />

  
      </div>
    </CustomForm >
      </>
  );
};
