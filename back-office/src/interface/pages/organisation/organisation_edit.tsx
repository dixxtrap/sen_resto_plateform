import  { useEffect, useState } from "react";
import { Title } from "../../components/title";
import { CustomForm } from "../../components/custom_form";
import {
  useGetCompanyByIdQuery,
  useUpdateCompanyByIdMutation,
} from "../../../core/features/company.slice";
import { useForm } from "@mantine/form";
import { CompanyDto } from "../../../core/models/company.dto";
import { useParams } from "react-router-dom";
import { Alert } from "../../components/alert_success";
import { CameraIcon } from "@heroicons/react/24/outline";
import { handlePreview } from "../../utils/handle_preview";
import {  TextInput } from "@mantine/core";
import { TextConstant } from "../../../core/data/textConstant";
import { LaltitudeLongituide } from "../../components/form/laltitude_logitude";
import { AddressForm } from "../../components/form/address_form";
import { CustomSwitchInput } from "../../components/switch";

export const OrganisationEdit = () => {
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
  } = useGetCompanyByIdQuery(id);
  const [update, { isError, isSuccess, isLoading, error,reset }] =
    useUpdateCompanyByIdMutation();
  const form = useForm<CompanyDto>({
  });
  useEffect(() => {
    if (old) {
      setPreview(old.data.imagePath)
      console.log(old)
      form.setValues(
old.data
      )
    }
  }, [isOldSuccess]);

  const _onSubmit = form.onSubmit(async (data: CompanyDto) => {
    console.log(data);
   const {regionId, departementId, municipalityId, ...rest}=data
    update({ id: parseInt(id), company: rest as CompanyDto , file:file! });
  });
  return !isOldSuccess ? (
    <Alert isOpen={isOldLoading} type="loading" title="Recuperation" />
  ) : (
    <div>
      <div className="flex flex-col justify-start divide-y divide-gray-500/10 gap-y-2 ">
        <Title title="Compagnie" />
          <div>
        <label htmlFor="file">
        <input type="file" hidden id="file" name="file" onChange={handleImage}/>
        {preview?<img  title="img" src={preview} className="h-20"/>
         :<CameraIcon className="h-20 text-secondary-500"/>}
        </label>
     </div>

     <CustomForm  isLoading={isLoading && isOldLoading} isError={isError} isSuccess={isSuccess} error={error}  subTitle="Creer une nouvelle compagnie" onSubmit={_onSubmit} onFinish={reset} >

<TextInput label={TextConstant.name} {...form.getInputProps("name")} error={form.errors["name"]} key={form.key("name")} />


<TextInput label={TextConstant.shortname} {...form.getInputProps("shortname")} error={form.errors["shortname"]} key={form.key("shortname")} />


<TextInput label={TextConstant.email} {...form.getInputProps("email")} error={form.errors["email"]} key={form.key("email")} />


<TextInput label={TextConstant.phone} {...form.getInputProps("phone")} error={form.errors["phone"]} key={form.key("phone")} />


<TextInput label={TextConstant.description} {...form.getInputProps("description")} error={form.errors["description"]} key={form.key("description")} />


{    old&&  isOldSuccess&&  <>   <AddressForm form={form}  isUpdatable />
           <LaltitudeLongituide form={form} /></> }
           <CustomSwitchInput label="Status" itemKey="isActive" form={form}/>
</CustomForm>
      </div>
    </div>
  );
};
