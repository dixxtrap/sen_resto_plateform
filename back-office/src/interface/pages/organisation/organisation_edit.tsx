import  { useEffect, useState } from "react";
import { Title } from "../../components/title";
import { CustomForm } from "../../components/custom_form";
import { Input } from "../../components/input";
import {
  useGetCompanyByIdQuery,
  useUpdateCompanyByIdMutation,
} from "../../../core/features/company.slice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CompanyDto, companySchema } from "../../../core/models/company.dto";
import { useParams } from "react-router-dom";
import { Alert } from "../../components/alert_success";
import { CameraIcon } from "@heroicons/react/24/outline";
import { handlePreview } from "../../utils/handle_preview";

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
  const [update, { isError, isSuccess, isLoading, reset }] =
    useUpdateCompanyByIdMutation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(companySchema),
  });
  useEffect(() => {
    if (old) {
      setValue("name", old?.data.name!);
      setValue("shortname", old?.data.shortname!);
      setValue("email", old?.data.email!);
      setValue("phone", old?.data.phone!);
      setValue("address.streetAddress", old?.data.address!.streetAddress);
      setValue("address.city", old?.data.address?.city!);
      setValue("address.country", old?.data.address?.country!);
      setValue("description", old?.data.description!);
      setValue("address.country", old?.data.address?.country!);
      setValue("location.latitude", old?.data.location?.latitude!);
      setValue("location.longitude", old?.data.location?.longitude!);
    }
  }, [old, setValue]);

  const _onSubmit = handleSubmit(async (data: CompanyDto) => {
    console.log(data);
    if(file){
      const formData = new FormData();
      formData.append("file", file!);
await fetch(`/v1/company_restaurant/update/${old?.data?.id}`,{
  method: "PUT",
  body: formData,
})
    }
    update({ id: parseInt(id), company: data });
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
        {preview?<img  title="img" src={preview} className="h-20"/>:old?.data.imagePath?<img  title="img"  src={`${old?.data.imagePath}`} className="h-20"/>:<CameraIcon className="h-20 text-secondary-500"/>}
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
          <Input
            label="Nom"
            error={errors.name?.message!}
            children={<input className="input" {...register("name")} />}
          />
          <Input
            label="Abbréviation"
            error={errors.shortname?.message!}
            children={<input className="input" {...register("shortname")} />}
          />
          <Input
            label="Email"
            error={errors.email?.message!}
            children={<input className="input" {...register("email")} />}
          />
          <Input
            label="Téléphone"
            error={errors.phone?.message!}
            children={<input className="input" {...register("phone")} />}
          />
          <Input
            label="Description"
            error={errors.phone?.message!}
            children={<textarea className="input" {...register("description")} />}
          />
          
             <div className="flex gap-8  w-full flex-wrap">
            <Input
              label="Adresse"
              className=" max-w-lg"
              error={errors.address?.streetAddress?.message!}
              children={<input className="input " {...register("address.streetAddress")} />}
            />
            
            <Input
              label="Code Postal"
              className=" max-w-lg"
              error={errors.address?.postalCode?.message!}
              children={<input className="input " {...register("address.postalCode")} />}
            />
          </div>
          <div className="flex gap-8  w-full flex-wrap">
            <Input
              label="Region"
              className=" max-w-lg"
              error={errors.address?.city?.message!}
              children={<input className="input " {...register("address.city")} />}
            />
            
            <Input
              label="Pays"
              className=" max-w-lg"
              error={errors.address?.country?.message!}
              children={<input className="input " {...register("address.country")} />}
            />
          </div>
          <div className="flex gap-8 w-full flex-wrap">
            
            <Input
              label="Laltitude"
              error={errors.location?.latitude?.message!}
              className=" max-w-lg"
              children={
                <input className="input grow " {...register("location.latitude")} />
              }
            />
            <Input
              label="Longitude"
              error={errors.location?.longitude?.message!}
              className=" max-w-lg"
              children={
                <input className="input grow " {...register("location.longitude")} />
              }
            />   
          </div>
        </CustomForm>
      </div>
    </div>
  );
};
