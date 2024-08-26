import { useForm } from "@mantine/form";
import { useGetRolesQuery } from "../../../core/features/role.slice";
import { useCreateUserMutation } from "../../../core/features/auth.slice";
import { useGetCompanyChildrenQuery } from "../../../core/features/company.slice";
import { CustomForm } from "../../components/custom_form";
import { Select, TextInput } from "@mantine/core";
import { TextConstant } from "../../../core/data/textConstant";
import { AddressForm } from "../../components/form/address_form";

export const UserCreate = () => {
  const { data: roles  } = useGetRolesQuery("");
  const { data: companies  } = useGetCompanyChildrenQuery("");

  const [createUser, { isSuccess, isError, isLoading, reset }] =
    useCreateUserMutation();
  const form = useForm({
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

          
      <TextInput label={TextConstant.firstname} {...form.getInputProps("firstname")} error={form.errors["firstname"]} key={form.key("firstname")} />

     
        <TextInput label={TextConstant.lastname} {...form.getInputProps("lastname")} error={form.errors["lastname"]} key={form.key("lastname")} />

 
      <TextInput label={TextConstant.email} {...form.getInputProps("email")} error={form.errors["email"]} key={form.key("email")} />

    
      <TextInput label={TextConstant.phone} {...form.getInputProps("phone")} error={form.errors["phone"]} key={form.key("phone")} />

   
        <AddressForm form={form} />

       
        

   
       
         
       
        <Select label={"Organisation"} error={form.errors["parentId"]} key={form.key("parentId")}{...form.getInputProps("parentId")} data={companies?.data.map((e) =>({label:e.name!, value:`${e.id}`}))}/>
        <Select  label={"Role"} error={form.errors["roleId"]} key={form.key("roleId")}{...form.getInputProps("roleId")} data={roles?.children?.map((e) =>({label:e.name!, value:`${e.id}`}))}/>

      </CustomForm>
    </div>
  );
};
