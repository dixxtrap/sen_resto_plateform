import { useEffect } from "react";
import { CustomForm } from "../../components/custom_form";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../../../core/features/auth.slice";
import { useParams } from "react-router-dom";
import { User } from "../../../core/models/user.dto";
import { useGetRolesQuery } from "../../../core/features/role.slice";
import { useGetCompanyQuery } from "../../../core/features/company.slice";
import { useForm } from "@mantine/form";
import { TextConstant } from "../../../core/data/textConstant";
import { Select, TextInput } from "@mantine/core";
import { PlaceAddressForm } from "../../components/form/google_place_address";

export const UserEdit = () => {
  const { data: roles } = useGetRolesQuery("");
  const { data: companies } = useGetCompanyQuery("");
  const { id } = useParams();
  const {
    data: oldUser,
    isSuccess: isUserSuccess,
    isLoading: isUserLoading,
    // isError: isUserError,
  } = useGetUserByIdQuery(parseInt(id!));
  const [update, { isError, isSuccess, isLoading, reset }] =
    useUpdateUserMutation();
    console.log(oldUser)
  const form = useForm<User>({initialValues:{location:{latitude:0, longitude:0}}});
  useEffect(() => {
    if (oldUser) {
      console.log(oldUser);
      form.setFieldValue("companyId", oldUser.data?.companyId!);
      form.setFieldValue("firstname", `${oldUser.data.firstname}`);
      form.setFieldValue("lastname", `${oldUser.data.lastname}`);
      form.setFieldValue("email", `${oldUser.data.email}`);
      form.setFieldValue("phone", `${oldUser.data.phone}`);
      form.setFieldValue("address", oldUser.data?.address!);
      form.setFieldValue("companyId", oldUser.data?.company?.id?.toString());
      // form.setFieldValue('cityId',`${oldUser.data.cityId!}`)
      form.setFieldValue("roleId", oldUser.data.role?.id!.toString());
    }
  }, [oldUser]);
  const _onSubmit = form.onSubmit((body: User) => {
    console.log(body);
    update({ id: parseInt(id!), user: { ...body } });
  });

  return (
    <>
      {isUserSuccess && (
        <CustomForm
          title="Agent"
          subTitle="Modifier l utilisateur"
          onSubmit={_onSubmit}
          isError={isError}
          isLoading={isLoading || isUserLoading}
          isSuccess={isSuccess}
          onFinish={reset}
        >
          <TextInput
            label={TextConstant.firstname}
            {...form.getInputProps("firstname")}
            error={form.errors["firstname"]}
            key={form.key("firstname")}
          />

          <TextInput
            label={TextConstant.lastname}
            {...form.getInputProps("lastname")}
            error={form.errors["lastname"]}
            key={form.key("lastname")}
          />

          <TextInput
            label={TextConstant.email}
            {...form.getInputProps("email")}
            error={form.errors["email"]}
            key={form.key("email")}
          />

          <TextInput
            label={TextConstant.phone}
            {...form.getInputProps("phone")}
            error={form.errors["phone"]}
            key={form.key("phone")}
          />

          <PlaceAddressForm isUpdatable form={form} />

          <Select
            label={"Compagnie"}
            error={form.errors["companyId"]}
            key={form.key("companyId")}
            {...form.getInputProps("companyId")}
            data={companies?.data.map((e) => ({
              label: e.name!,
              value: `${e.id}`,
            }))}
          />

          <Select
            label={"Role"}
            error={form.errors["roleId"]}
            key={form.key("roleId")}
            {...form.getInputProps("roleId")}
            data={roles?.children?.map((e) => ({
              label: e.name!,
              value: `${e.id}`,
            }))}
          />
        </CustomForm>
      )}
    </>
  );
};
