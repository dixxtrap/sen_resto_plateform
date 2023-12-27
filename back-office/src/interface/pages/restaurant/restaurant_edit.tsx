import { useEffect } from "react";
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
import { ImgPreview } from "../../components/Img_preview";

export const RestaurantEdit = () => {
  const { id } = useParams();
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
  const _onSubmit =handleSubmit( (body: CompanyDto) => {
    console.log(body);
    updateCompany({ id: parseInt(id!), restos: body! });
  });
  useEffect(() => {
    if (oldRestaurant) {
      setValue("name", oldRestaurant.name!);
      setValue("phone", oldRestaurant.phone!);
      setValue("email", oldRestaurant.email!);
      setValue("description", oldRestaurant.description!);
      setValue("laltitude", oldRestaurant.laltitude!);
      setValue("longitude", oldRestaurant.longitude!);
    }
  }, [oldRestaurant, setValue]);

  return (
    <div className="flex flex-col justify-start">
      <Alert type="loading" title="Recuperation" isOpen={isRestaurantLoading} />
      <Title
        title="Restaurant"
        subTitle={"Modifier le restaurant" + " " + oldRestaurant?.name}
      />
      {oldRestaurant?.parent!.id! == 1 ? (
        <ImgPreview
          img={oldRestaurant!.profile!}
          name={"profile"}
          className="h-20 md:h-36 bg-indigo-100 mr-auto  self-start place-self-start "
        />
      ) : null}
      <CustomForm
        isError={isError}
        onFinish={() => reset()}
        isLoading={isLoading}
        isSuccess={isSuccess}
        onSubmit={_onSubmit}
      >
        <Input label="Nom du Restaurant" error={errors.name?.message}>
          <input {...register("name")} className="input" />
        </Input>
        <Input label="Email" error={errors.email?.message}>
          <input {...register("email")} className="input" />
        </Input>
        <Input label="Téléphone" error={errors.phone?.message}>
          <input {...register("phone")} className="input" />
        </Input>
        <Input label="Description" error={errors.description?.message}>
          <textarea {...register("description")} className="input" />
        </Input>
        <div className="flex gap-8  w-full flex-wrap">
          <Input
            label="Laltitude"
            className=" max-w-lg"
            error={errors.city?.message}
            children={<input className="input " {...register("laltitude")} />}
          />
          <Input
            label="Longitude"
            className=" max-w-lg"
            error={errors.country?.message}
            children={<input className="input " {...register("longitude")} />}
          />
        </div>
        {/* {Object.values(errors).map(e=><span>{e.message}</span>)} */}
      </CustomForm>
    </div>
  );
};
