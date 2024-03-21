import { useEffect } from "react";
import { CustomForm } from "../../components/custom_form";
import { Input } from "../../components/input";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../../../core/features/auth.slice";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { User, userSchema } from "../../../core/models/user.dto";
import { Alert } from "../../components/alert_success";
import { useGetRolesQuery } from "../../../core/features/role.slice";
import { useGetCompanyChildrenQuery } from "../../../core/features/company.slice";
import { clsx } from "../../utils/clsx";
import { RoleDto } from "../../../core/models/role.dto";

export const UserEdit = () => {
  const { data: roles  } = useGetRolesQuery("");
  const { data: companies = [] } = useGetCompanyChildrenQuery("");
  const { id } = useParams();
  const {
    data: oldUser,
    isSuccess: isUserSuccess,
    isLoading: isUserLoading,
    // isError: isUserError,
  } = useGetUserByIdQuery(parseInt(id!));
  const [update, { isError, isSuccess, isLoading , reset}] = useUpdateUserMutation();
  const {
    register,
    handleSubmit,
    setValue,
  
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchema) });
  useEffect(() => {
    if (oldUser) {
      setValue("firstname", oldUser.firstname!);
      setValue("lastname", oldUser.lastname!);
      setValue("birthday", oldUser.birthday!);
      setValue("email", oldUser.email!);
      setValue("roleId", oldUser.roleId!);
      setValue("phone", oldUser.phone!);
      setValue("parentId", oldUser.parentId!);
      setValue("address.streetAddress", oldUser.address?.streetAddress!);
      setValue("address.country", oldUser.address?.country!);
      setValue("address.city", oldUser.address?.city!);
      console.log(oldUser.birthday)
      setValue("birthday", oldUser.birthday);
    }
  }, [oldUser, setValue]);
  const _onSubmit = (body: User) => {
    console.log(body);
    update({ id: parseInt(id!), user: {...body} });
  };
  const showRole = (role: RoleDto) => {
    return role.children?.length! > 0 ? (
      <optgroup className="dark:bg-black" label={role.name}>
        <option selected={oldUser?.roleId===role.id} value={role.id} className="dark:bg-black">
          {role.name}
        </option>
        {role.children?.map((role2) => (
          <option selected={oldUser?.roleId===role2.id} className="dark:bg-black" value={role2.id}>
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
    <>
      {
        <Alert
          isOpen={isUserLoading}
          title="Recuperation.... "
          message="PAtientez juste un moment"
          type="loading"
        />
      }
      {isUserSuccess && (
        <CustomForm
          title="Agent"
          subTitle="Modifier l utilisateur"
          onSubmit={handleSubmit(_onSubmit)}
          isError={isError}
          isLoading={isLoading}
          isSuccess={isSuccess}
          onFinish={reset}
          children={
            <>
              <Input label="Prénom" error={errors.firstname?.message}>
                <input
                  type="text"
                  className="input"
                  {...register("firstname")}
                />
              </Input>
              <Input label="Nom" error={errors.lastname?.message}>
                <input
                  type="text"
                  className="input"
                  {...register("lastname")}
                />
              </Input>
              <Input label="Email" error={errors.email?.message}>
                <input type="text" className="input" {...register("email")} />
              </Input>
              <Input label="Téléphone" error={errors.phone?.message}>
                <input type="text" className="input" {...register("phone")} />
              </Input>
              <Input label="Date de Naissance" error={errors.birthday?.message}>
                <input
                  type="date"
                  className="input"
                  {...register("birthday")}
                />
              </Input>
              <Input label="Adresse" error={errors.address?.streetAddress?.message}>
                <input type="text" className="input" {...register("address.streetAddress")} />
              </Input>
              <Input label="Region" error={errors.address?.city?.message}>
                <input type="text" className="input" {...register("address.city")} />
              </Input>

              <Input label="Pays" error={errors.address?.country?.message}>
                <input type="text" className="input" {...register("address.country")} />
              </Input>
              <Input label="Organisation">
                <select
                  className={clsx("input", "h-9")}
                  {...register("parentId")}
                >
                  {companies.map((e) => (
                    <option className="input" value={e.id}>
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
            </>
          }
        />
      )}
    </>
  );
};
