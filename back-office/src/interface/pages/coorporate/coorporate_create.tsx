import { useForm } from "react-hook-form";
import { useCreateCoorporateMutation } from "../../../core/features/coorporate.slice";
import { CustomForm } from "../../components/custom_form";
import { Input } from "../../components/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { CompanyDto, companySchema } from "../../../core/models/company.dto";

export const CoorporateCreate = () => {
    const [createCompany, { isError, isSuccess, isLoading, reset , error}] =
    useCreateCoorporateMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(companySchema),
  });
  const _onsubmit = (data: CompanyDto | unknown) => {
    console.log(data);
    createCompany(data as CompanyDto);
  };
  return (
    <div className="flex flex-col divide-y gap-y-2 ">
      
      <CustomForm  title="Compagnie" error={error} isLoading={isLoading} isError={isError} isSuccess={isSuccess}  subTitle="Creer une nouvelle compagnie" onSubmit={handleSubmit(_onsubmit)} onFinish={reset} >
        <Input
          label="Nom"
          error={errors.name?.message}
          children={<input className="input" {...register("name")} />}
        />
        <Input
          label="Abbréviation"
          error={errors.shortname?.message}
          children={<input className="input" {...register("shortname")} />}
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
          error={errors.description?.message}
          children={<textarea className="input" {...register("description")} />}
        />
        <Input
          label="Adresse"
          error={errors.address?.message}
          children={<input className="input" {...register("address.streetAddress")} />}
        />
        <div className="flex gap-8  w-full flex-wrap">
          <Input
            label="Region"
            className=" max-w-lg"

            error={errors.address?.city?.message}

            children={
              <input className="input " {...register("address.city")} />
            }
          />
          <Input
            label="Pays"
            className=" max-w-lg"

            error={errors.address?.country?.message}
            children={
              <input className="input " {...register("address.country")} />
            }
          />
        </div>
        <div className="flex gap-8 w-full flex-wrap">
          <Input
            label="Longitude"
            error={errors.location?.longitude?.message}
            className=" max-w-lg"

            children={
              <input className="input grow " {...register("location.longitude")} />
            }
          />
          <Input
            label="Laltitude"
            error={errors.location?.latitude?.message}
            className=" max-w-lg"
            children={
              <input className="input grow " {...register("location.latitude")} />
            }
          />
        </div>

      </CustomForm>
    </div>
  );
}
