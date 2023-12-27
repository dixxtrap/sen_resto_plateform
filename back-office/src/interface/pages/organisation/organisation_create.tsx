import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CompanyDto, companySchema } from "../../../core/models/company.dto";
import { useCreateCompanyMutation } from "../../../core/features/company.slice";
import { Input } from "../../components/input";
import { CustomForm } from "../../components/custom_form";

export const OrganisationCreate = ({type="company"}:{type?:string}) => {
  const [createCompany, { isError, isSuccess, isLoading }] =
    useCreateCompanyMutation();
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
      
      <CustomForm  title="Compagnie" isLoading={isLoading} isError={isError} isSuccess={isSuccess}  subTitle="Creer une nouvelle compagnie" onSubmit={handleSubmit(_onsubmit)}>
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
          error={errors.description?.message}
          children={<textarea className="input" {...register("description")} />}
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

            children={
              <input className="input " {...register("city")} />
            }
          />
          <Input
            label="Pays"
            className=" max-w-lg"

            error={errors.country?.message}
            children={
              <input className="input " {...register("country")} />
            }
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
  );
};
