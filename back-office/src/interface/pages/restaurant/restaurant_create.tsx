
import { CustomForm } from "../../components/custom_form";
import {
  useCreateRestaurantMutation,
} from "../../../core/features/restaurant.slice";
import { useForm } from "react-hook-form";
import { Input } from "../../components/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { CompanyDto, companySchema } from "../../../core/models/company.dto";

export const RestaurantCreate = () => {
  const [create, { isError, isLoading, isSuccess, reset }] =
    useCreateRestaurantMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues:{
      openingTime:"08:00:00",
      closingTime:"23:00:00",
      location:{
        latitude:0.000,
        longitude:0.000
      }
    },
    resolver: yupResolver(companySchema),
  });
  const _onSubmit = handleSubmit((body: CompanyDto) => {
    console.log(`-------------------${body.description}`);
    console.log(body);
    create({ ...body });
  });
  return (
    <CustomForm
      title="Restaurant"
      isError={isError}
      isLoading={isLoading}
      isSuccess={isSuccess}
      subTitle={" Creer un nouveau restaurant"}
      onSubmit={_onSubmit}
     onFinish={reset}
    >
      <ul>
        {Object.entries(errors).map(([cle, valeur]) => (
          <li key={cle}>
            <strong>{cle}:</strong> {valeur.message}
          </li>
        ))}
      </ul>
      <Input label="Nom du Restaurant" error={errors.name?.message}>
        <input {...register("name")} className="input" />
      </Input>
      <Input label="Nom Commercial" error={errors.name?.message}>
        <input {...register("shortname")} className="input" />
      </Input>
      <Input label="Email" error={errors.email?.message}>
        <input {...register("email")} className="input" />
      </Input>
      <Input label="Téléphone" error={errors.phone?.message}>
        <input {...register("phone")} className="input" />
      </Input>
      <Input label="Adresse" error={errors.address?.streetAddress?.message}>
        <input {...register("address.streetAddress")} className="input" />
      </Input>
      <Input label="Ville" error={errors.address?.city?.message}>
        <input {...register("address.city")} className="input" />
      </Input>
      <Input label="Pays" error={errors.address?.country?.message}>
        <input {...register("address.country")} className="input" />
      </Input>
      <Input label="Description" error={errors.description?.message}>
        <textarea {...register("description")} className="input" />
      </Input>
      <div className="flex gap-8 w-full flex-wrap">
        <Input
          label="Laltitude"
          error={errors.location?.latitude?.message}
          className=" max-w-lg"
          children={
            <input className="input grow " {...register("location.latitude")} />
          }
        />
        <Input
          label="Longitude"
          error={errors.location?.latitude?.message}
          className=" max-w-lg"
          children={
            <input className="input grow " {...register("location.longitude")} />
          }
        />
      </div>
      <div className="flex gap-8 w-full flex-wrap">
        <Input
          label="Ouverture"
          error={errors.openingTime?.message}
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
          error={errors.closingTime?.message}
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
    </CustomForm>
  );
};
