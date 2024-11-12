import { useForm } from "@mantine/form";
import { useGetRolesQuery } from "../../../core/features/role.slice";
import { useCreateUserMutation } from "../../../core/features/auth.slice";
import { useGetCompanyQuery } from "../../../core/features/company.slice";
import { CustomForm } from "../../components/custom_form";
import { Select, TextInput } from "@mantine/core";
import { TextConstant } from "../../../core/data/textConstant";
import { PlaceAddressForm } from "../../components/form/google_place_address";

export const UserCreate = () => {
  const { data: roles } = useGetRolesQuery("");
  const { data: companies } = useGetCompanyQuery("");

  const [createUser, { isSuccess, isError, isLoading, reset }] =
    useCreateUserMutation();
  const form = useForm({
    initialValues: { location: { latitude: 0, longitude: 0 } },
  });
  const _onSubmit = form.onSubmit((data) => {
    createUser({ ...data, password: "000000" });
  });

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
          label={"Organisation"}
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
    </div>
  );
};
