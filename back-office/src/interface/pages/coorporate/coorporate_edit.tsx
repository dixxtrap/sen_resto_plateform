
import { Alert } from "../../components/alert_success";
import { CustomForm } from "../../components/custom_form";
import { Title } from "../../components/title";
import { CompanyDto } from "../../../core/models/company.dto";
import { useGetCoorporateByIdQuery, useUpdateCoorporateByIdMutation } from "../../../core/features/coorporate.slice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { handlePreview } from "../../utils/handle_preview";
import { useForm } from "@mantine/form";
import { CameraIcon } from "@heroicons/react/24/solid";
import {  TextInput } from "@mantine/core";
import { AddressForm } from "../../components/form/address_form";
import { LaltitudeLongituide } from "../../components/form/laltitude_logitude";
import { AppTextarea } from "../../components/form/app_textarea";

export const CoorporateEdit = () => {
  const id = useParams().id!;
  const [preview, setPreview]=useState<string>();
  const [file, setFile]=useState<File>();
  const [changed, setChanged]=useState< boolean>(false);
console.log(changed)
  const handleImage=handlePreview({previewImage:preview!, setPreviewImage:setPreview, setFile:setFile, setChanged:setChanged})
  const {
    data: old,
    isLoading: isOldLoading,
    isSuccess: isOldSuccess,
  } = useGetCoorporateByIdQuery(id);
  const [update, { isError, isSuccess, isLoading, reset }] =
    useUpdateCoorporateByIdMutation();
  const form= useForm({
  
  });
  useEffect(() => {
    if (old) {
    form.setValues(old.data)
    setPreview(old.data.imagePath)
    }
  }, [old]);

  const _onSubmit = form.onSubmit(async (data: CompanyDto) => {
   
    update({ id: parseInt(id), coorporate: data, file:file! });
  });
  return !isOldSuccess ? (
    <Alert isOpen={isOldLoading} type="loading" title="Recuperation" />
  ) : (
    <div>
      <div className="flex flex-col justify-start divide-y divide-gray-500/10 gap-y-2 ">
        <Title title="Compagnie" />
          <div>
        <label htmlFor="file">
     
        <input type="file" hidden id="file" name="file" onChange={handleImage} onLoad={handleImage} onLoadedData={handleImage}  />
        {preview?<img title="daxx" src={preview} className="h-20"/>:<CameraIcon className="h-20 text-secondary-500"/>}
        </label>
     </div>

        <CustomForm
          isLoading={isLoading}
          isError={isError}
          isSuccess={isSuccess}
          subTitle="Creer une nouvelle compagnie"
          onFinish={reset}
          onSubmit={_onSubmit}
        >
          
            <TextInput label="Nom" {...form.getInputProps("name")} error={form.errors["name"]} key={form.key("name")} />
         
            <TextInput label="Abbréviation" {...form.getInputProps("shortname")} error={form.errors["shortname"]} key={form.key("shortname")} />
            
        
            <TextInput label="Email" {...form.getInputProps("email")} error={form.errors["email"]} key={form.key("email")} />
            
         
            <TextInput label="Téléphone" {...form.getInputProps("phone")} error={form.errors["phone"]} key={form.key("phone")} />
            
         
            <AppTextarea form={form} />
          
          <AddressForm form={form} isUpdatable/>
     
<LaltitudeLongituide form={form}/>
        </CustomForm>
      </div>
    </div>
  );
}


