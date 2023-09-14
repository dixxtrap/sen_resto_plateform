import React, { useEffect } from "react";
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
import { ImgPreview } from "../../components/Img_preview";
import { Alert } from "../../components/alert_success";
import { CameraIcon } from "@heroicons/react/24/outline";

export const OrganisationEdit = () => {
  const id = useParams().id!;
  const {
    data: old,
    isLoading: isOldLoading,
    isSuccess: isOldSuccess,
  } = useGetCompanyByIdQuery(id);
  const [update, { isError, isSuccess, isLoading }] =
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
      setValue("name", old.name!);
      setValue("short_name", old.short_name!);
      setValue("email", old.email!);
      setValue("phone", old.phone!);
      setValue("address", old.address!);
      setValue("city", old.city!);
      setValue("description", old.description!);
      setValue("country", old.country!);
      setValue("laltitude", old.laltitude!);
      setValue("longitude", old.longitude!);
    }
  }, [old, setValue]);

  const _onSubmit = handleSubmit((data: CompanyDto) => {
    console.log(data);
    update({ id: parseInt(id), company: data });
  });
  return !isOldSuccess ? (
    <Alert isOpen={isOldLoading} type="loading" title="Recuperation" />
  ) : (
    <div>
      <div className="flex flex-col divide-y gap-y-2 ">
        <Title title="Compagnie" />
        <div className="flex bg-pink-400 mr-auto">
          <ImgPreview
            img={old!.profile!}
              name={"profile"}
              icon={<CameraIcon />}
              
            className="h-20 md:h-100 md:w-100  bg-indigo-100 "
          />
        </div>

        <CustomForm
          isLoading={isLoading}
          isError={isError}
          isSuccess={isSuccess}
          subTitle="Creer une nouvelle compagnie"
          onSubmit={_onSubmit}
        >
          <Input
            label="Nom"
            error={errors.name?.message}
            children={<input className="input" {...register("name")} />}
          />
          <Input
            label="Abbréviation"
            error={errors.short_name?.message}
            children={<input className="input" {...register("short_name")} />}
          />
          <Input
            label="Email"
            error={errors.email?.message}
            children={<input className="input" {...register("email")} />}
          />
          <Input
            label="Téléphone"
            error={errors.phone?.message}
            children={<input className="input" {...register("phone")} />}
          />
          <Input
            label="Description"
            error={errors.phone?.message}
            children={<input className="input" {...register("description")} />}
          />
          <Input
            label="Adresse"
            error={errors.address?.message}
            children={<input className="input" {...register("address")} />}
          />
          <div className="flex gap-8  w-full flex-wrap">
            <Input
              label="Region"
              className=" max-w-lg"
              error={errors.city?.message}
              children={<input className="input " {...register("city")} />}
            />
            <Input
              label="Pays"
              className=" max-w-lg"
              error={errors.country?.message}
              children={<input className="input " {...register("country")} />}
            />
          </div>
          <div className="flex gap-8 w-full flex-wrap">
            <Input
              label="Longitude"
              error={errors.longitude?.message}
              className=" max-w-lg"
              children={
                <input className="input grow " {...register("longitude")} />
              }
            />
            <Input
              label="Laltitude"
              error={errors.laltitude?.message}
              className=" max-w-lg"
              children={
                <input className="input grow " {...register("laltitude")} />
              }
            />
          </div>
        </CustomForm>
      </div>
    </div>
  );
};
