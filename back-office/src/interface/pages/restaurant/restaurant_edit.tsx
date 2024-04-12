import { useEffect, useState } from "react";
import { CustomForm } from "../../components/custom_form";
import { useParams } from "react-router-dom";
import {
  useGetRestaurantByIdQuery,
  useUpdateRestaurantByIdMutation,
} from "../../../core/features/restaurant.slice";
import { Alert } from "../../components/alert_success";
import { Input } from "../../components/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CompanyDto, companySchema } from "../../../core/models/company.dto";
import { Title } from "../../components/title";
import { handlePreview } from "../../utils/handle_preview";
import { CameraIcon } from "@heroicons/react/24/solid";
import { ProtecterPage } from "../../components/protecter_page";

export const RestaurantEdit = () => {
  const { id } = useParams();
  const [preview, setPreview]=useState<string>();
  const [file, setFile]=useState<File>();
  const [changed, setChanged]=useState< boolean>(false);
  const handleImage=handlePreview({previewImage:preview!, setPreviewImage:setPreview, setFile:setFile, setChanged:setChanged})
  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(companySchema),
  });
  const [updateCompany, { isLoading, isSuccess, isError, reset }] =
    useUpdateRestaurantByIdMutation();
  const { data: oldRestaurant, isLoading: isRestaurantLoading } =
    useGetRestaurantByIdQuery(parseInt(id!));
  const _onSubmit =handleSubmit(async  (body: CompanyDto) => {
    console.log(body)
    console.log(file)
    updateCompany({ id: parseInt(id!), restos: body!, file:file! });
  });
  useEffect(() => {
    if (oldRestaurant) {
      setPreview(oldRestaurant.data.imagePath!);
      setValue("name", oldRestaurant.data.name!);
      setValue("phone", oldRestaurant.data.phone!);
      setValue("shortname", oldRestaurant.data.shortname!);
      setValue("email", oldRestaurant.data.email!);
      setValue("description", oldRestaurant.data.description!);
      setValue("address.country", oldRestaurant.data.address?.country!);
      setValue("address.city", oldRestaurant.data.address?.city!);
      setValue("address.streetAddress", oldRestaurant.data.address?.streetAddress!);
      setValue("location.latitude", oldRestaurant.data.location?.latitude!);
      setValue("location.longitude", oldRestaurant.data.location?.longitude!);
      setValue("openingTime", oldRestaurant.data.openingTime!);
      setValue("closingTime", oldRestaurant.data.closingTime!);
    }
  }, [oldRestaurant, setValue]);

  return (
    <div className="flex flex-col justify-start">
      <Alert type="loading" title="Recuperation" isOpen={isRestaurantLoading} />
      <Title
        title="Restaurant"
        subTitle={"Modifier le restaurant" + " " + oldRestaurant?.data?.name}
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
     daxx
      <CustomForm
        isError={isError}
        onFinish={() => reset()}
        isLoading={isLoading}
        isSuccess={isSuccess}
        onSubmit={_onSubmit}
      
      >
       <Input label="Nom du Restaurant" error={errors.name?.message!}>
        <input {...register("name")} className="input" />
      </Input>
      <Input label="Abbreviation" error={errors.shortname?.message!}>
        <input {...register("shortname")} className="input" />
      </Input>
      <Input label="Email" error={errors.email?.message!}>
        <input {...register("email")} className="input" />
      </Input>
      <Input label="Téléphone" error={errors.phone?.message!}>
        <input {...register("phone")} className="input" />
      </Input>
      <Input label="Adresse" error={errors.address?.streetAddress?.message!}>
        <input {...register("address.streetAddress")} className="input" />
      </Input>
      <Input label="Ville" error={errors.address?.city?.message!}>
        <input {...register("address.city")} className="input" />
      </Input>
      <Input label="Pays" error={errors.address?.country?.message!}>
        <input {...register("address.country")} className="input" />
      </Input>
      <Input label="Description" error={errors.description?.message!}>
        <textarea {...register("description")} className="input" />
      </Input>
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
          error={errors.location?.latitude?.message!}
          className=" max-w-lg"
          children={
            <input className="input grow " {...register("location.longitude")} />
          }
        />
      </div>
      <div className="flex gap-8 w-full flex-wrap">
        <Input
          label="Ouverture"
          error={errors.openingTime?.message!}
          className=" max-w-lg"
          children={
            <input
              className="input grow "
              placeholder="00:00:00"
              {...register("openingTime")}
            />
          }
        />
        <Input
          label="Fermuture"
          error={errors.closingTime?.message!}
          className=" max-w-lg"
          children={
            <input
              className="input grow "
              placeholder="00:00:00"
              {...register("closingTime")}
            />
          }
        />
      </div>
        {/* {Object.values(errors).map(e=><span>{e.message}</span>)} */}
      </CustomForm>
    </div>
  );
};
