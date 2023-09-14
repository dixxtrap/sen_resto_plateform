import React, { useEffect } from "react";
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
import { useGetResttaurantQuery } from "../../../core/features/restaurant.slice";
import { useGetRolesQuery } from "../../../core/features/role.slice";
import { useGetCompanyQuery } from "../../../core/features/company.slice";
import { clsx } from "../../utils/clsx";

export const UserEdit = () => {
  const { data: restaurants = [] } = useGetResttaurantQuery("");
  const { data: roles = [] } = useGetRolesQuery("");
  const { data: companies = [] } = useGetCompanyQuery("");
  const { id } = useParams();
  const {
    data: oldUser,
    isSuccess: isUserSuccess,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetUserByIdQuery(parseInt(id!));
  const [update, { isError, isSuccess, isLoading }] = useUpdateUserMutation();
  const {
    register,
    handleSubmit,
    setValue,
    reset,watch,
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
      setValue("restaurantId", oldUser.restaurantId!);
      setValue("companyId", oldUser.companyId!);
      setValue("address", oldUser.address!);
      setValue("country", oldUser.country!);
      console.log(oldUser.birthday?.split("T")[0])
      setValue("birthday", oldUser.birthday?.split("T")[0]);
      setValue("city", oldUser.city!);
    }
  }, [oldUser, setValue]);
  const _onSubmit = (body: User) => {
    console.log(body);
    update({ id: parseInt(id!), user: body });
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
              <Input label="Adresse" error={errors.address?.message}>
                <input type="text" className="input" {...register("address")} />
              </Input>
              <Input label="Region" error={errors.city?.message}>
                <input type="text" className="input" {...register("city")} />
              </Input>

              <Input label="Pays" error={errors.country?.message}>
                <input type="text" className="input" {...register("country")} />
              </Input>
              <Input label="Organisation">
                <select
                  className={clsx("input", "h-9")}
                  {...register("companyId")}
                >
                  {companies.map((e) => (
                    <option className="input" value={e.id}>
                      {e.name}
                    </option>
                  ))}
                </select>
              </Input>
              <Input label="Restaurant">
                <select
                  className={clsx(
                    "input",

                    "h-9"
                  )}
                  {...register("restaurantId")}
                >
                  <option className="input py-2" value={0} >
                       
                      </option>
                  {restaurants
                    .filter((e) => e.companyId == watch("companyId"))
                    .map((e) => (
                      <option className="input py-2" value={e.id}>
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
                  {roles.map((e) => (
                    <option className="input lowercase py-2" value={e.id}>
                      {e.name}--{e.scope}
                    </option>
                  ))}
                </select>
              </Input>
            </>
          }
        />
      )}
    </>
  );
};
