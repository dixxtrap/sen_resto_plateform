import { useEffect } from "react";
import { CustomForm } from "../../components/custom_form";
import { useForm } from "react-hook-form";
import { userSchema } from "../../../core/models/user.dto";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../../components/input";
import { useGetRolesQuery } from "../../../core/features/role.slice";
import { useCreateUserMutation } from "../../../core/features/auth.slice";
import { RoleDto } from "../../../core/models/role.dto";
import { clsx } from "../../utils/clsx";
import { useGetCompanyChildrenQuery } from "../../../core/features/company.slice";

export const UserCreate = () => {
  const { data: roles  } = useGetRolesQuery("");
  const { data: companies = [] } = useGetCompanyChildrenQuery("");

  const [createUser, { isSuccess, isError, isLoading, reset }] =
    useCreateUserMutation();
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(userSchema),
  });
  const _onSubmit = handleSubmit((data) => {
    createUser({ ...data, password: "000000" });
  });

  const showRole = (role: RoleDto) => {
    return role.children?.length! > 0 ? (
      <optgroup className="dark:bg-black" label={role.name}>
        <option value={role.id} className="dark:bg-black">
          {role.name}
        </option>
        {role.children?.map((role2) => (
          <option className="dark:bg-black" value={role2.id}>
            {role2.name}
          </option>
        ))}
      </optgroup>
    ) : (
      <option className="dark:bg-black" value={role.id}>
        {role.name}
      </option>
    );
  };
  return (
    <div>
      <CustomForm
        onFinish={() => reset()}
        isSuccess={isSuccess}
        isError={isError}
        isLoading={isLoading}
        title="Agent"
        subTitle="Creer un nouveau Utilisateur"
        onSubmit={_onSubmit}
      >
        <Input
          label="Prenom"
          name="firstname"
          error={errors.firstname?.message}
        >
          <input id="firstname" className="input" {...register("firstname")} />
        </Input>
        <Input label="Nom" name="lastname">
          <input id="lastname" className="input" {...register("lastname")} />
        </Input>

        <Input label="Adresse Mail" name="email">
          <input id="email" className="input" {...register("email")} />
        </Input>
        <Input label="Téléphone" name="phone">
          <input id="phone" className="input" {...register("phone")} />
        </Input>
        <Input
          label="Adrresse"
          name="address"
          error={errors.address?.streetAddress?.message}
        >
          <input
            id="address"
            className="input"
            {...register("address.streetAddress")}
          />
        </Input>
        <Input label="Region" name="city" error={errors.address?.city?.message}>
          <input id="city" className="input" {...register("address.city")} />
        </Input>
        <Input
          label="Pays"
          name="country"
          error={errors.address?.country?.message}
        >
          <input
            id="country"
            className="input"
            {...register("address.country")}
          />
        </Input>
        <Input label="Organisation">
          <select className={clsx("input", "h-9")} {...register("parentId")}>
            {companies.map((e) => (
              <option className="input dark:bg-black" value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </Input>

        <Input label="Role">
          <select
            className={clsx("input", "lowercase", "h-9")}
            {...register("roleId")}
          >
            {roles?.children?.map((e) => showRole(e))}
          </select>
        </Input>
      </CustomForm>
    </div>
  );
};
