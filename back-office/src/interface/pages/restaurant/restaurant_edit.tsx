import { useEffect, useState } from "react";
import { CustomForm } from "../../components/custom_form";
import { useParams } from "react-router-dom";
import {
  useGetRestaurantByIdQuery,
  useUpdateRestaurantByIdMutation,
} from "../../../core/features/restaurant.slice";

import { useForm } from "@mantine/form";
import { CompanyDto,  } from "../../../core/models/company.dto";
import { Title } from "../../components/title";
import { handlePreview } from "../../utils/handle_preview";
import { CameraIcon } from "@heroicons/react/24/solid";
import { ProtecterPage } from "../../components/protecter_page";
import { TextConstant } from "../../../core/data/textConstant";
import { TimeInput } from "@mantine/dates";
import { LaltitudeLongituide } from "../../components/form/laltitude_logitude";
import { AddressForm } from "../../components/form/address_form";
import { AppTextarea } from "../../components/form/app_textarea";
import { CustomSwitchInput } from "../../components/switch";
import { TextInput } from "@mantine/core";

export const RestaurantEdit = () => {
  const { id } = useParams();
  const [preview, setPreview]=useState<string>();
  const [file, setFile]=useState<File>();
  const [changed, setChanged]=useState< boolean>(false);
  const handleImage=handlePreview({previewImage:preview!, setPreviewImage:setPreview, setFile:setFile, setChanged:setChanged})
  const form = useForm({
  
  });
  const [updateCompany, { isLoading, isSuccess, isError, reset }] =
    useUpdateRestaurantByIdMutation();
  const old =
    useGetRestaurantByIdQuery(parseInt(id!));
  const _onSubmit =form.onSubmit(async  (body: CompanyDto) => {
    console.log(body)
    console.log(file)
    updateCompany({ id: parseInt(id!), restos: body!, file:file! });
  });
  useEffect(() => {
    if (old.data) {
      setPreview(old.data.data.imagePath!);
     form.setValues(old.data.data)
    }
  }, [old.data]);

  return (
    <div className="flex flex-col justify-start">
      <Title
        title="Restaurant"
        subTitle={"Modifier le restaurant" + " " + old.data?.data?.name}
      />
      {changed&& <></>}
    <div>
       <ProtecterPage permissions={[{code:"update_restaurant_profile", type:"update"}]}>
       <label htmlFor="file">
        <input type="file" hidden id="file" name="file" onChange={handleImage}/>
        {preview?<img  alt='' src={preview} className="h-20 rounded-md"/>:<CameraIcon className="h-20 text-secondary-500 "/>}
        </label>
       </ProtecterPage>
     </div>
     
     <CustomForm
      
      isError={isError}
      isLoading={isLoading ||old.isLoading}
      isSuccess={isSuccess}
    
      onSubmit={_onSubmit}
     onFinish={reset}
    >
      
    
      <TextInput label={TextConstant.name} {...form.getInputProps("name")} error={form.errors["name"]} key={form.key("name")} />

     
      <TextInput label={TextConstant.shortname} {...form.getInputProps("shortname")} error={form.errors["shortname"]} key={form.key("shortname")} />

      
      <TextInput label={TextConstant.email} {...form.getInputProps("email")} error={form.errors["email"]} key={form.key("email")} />

     
      <TextInput label={TextConstant.phone} {...form.getInputProps("phone")} error={form.errors["phone"]} key={form.key("phone")} />

     

      <AppTextarea form={form}/>
        <AddressForm form={ form} isUpdatable />
        <LaltitudeLongituide form={ form } />
        <CustomSwitchInput itemKey="isActive" form={form}/>
      <div className="flex gap-8 w-full flex-wrap">
        
      <TimeInput label={"Ouverture"} {...form.getInputProps("openingTime")} error={form.errors["openingTime"]} key={form.key("openingTime")} />
      <TimeInput label={"Fermuture"} {...form.getInputProps("closingTime")} error={form.errors["closingTime"]} key={form.key("closingTime")} />

  
      </div>
    </CustomForm >
    </div>
  );
};
