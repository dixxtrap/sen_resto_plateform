import {useEffect} from'react'
import { CustomForm } from "../../components/custom_form";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../../../core/features/auth.slice";
import { useParams } from "react-router-dom";
import { User } from "../../../core/models/user.dto";
import { useGetRolesQuery } from "../../../core/features/role.slice";
import { useGetCompanyChildrenQuery } from "../../../core/features/company.slice";
import { useForm } from "@mantine/form";
import { TextConstant } from '../../../core/data/textConstant';
import { Select, TextInput } from '@mantine/core';
import { AddressForm } from '../../components/form/address_form';

export const UserEdit = () => {
  const { data: roles  } = useGetRolesQuery("");
  const { data: companies} = useGetCompanyChildrenQuery("");
  const { id } = useParams();
  const {
    data: oldUser,
    isSuccess: isUserSuccess,
    isLoading: isUserLoading,
    // isError: isUserError,
  } = useGetUserByIdQuery(parseInt(id!));
  const [update, { isError, isSuccess, isLoading , reset}] = useUpdateUserMutation();
  const form= useForm();
  useEffect(() => {
    if (oldUser) {
      form.setValues( oldUser.data);
    }
  }, [oldUser]);
  const _onSubmit = form.onSubmit((body: User) => {
    console.log(body);
    update({ id: parseInt(id!), user: {...body} });
  });

  return (
    <>
     
      {isUserSuccess && (
        <CustomForm
          title="Agent"
          subTitle="Modifier l utilisateur"
          onSubmit={_onSubmit}
          isError={isError}
          isLoading={isLoading||isUserLoading}
          isSuccess={isSuccess}
          onFinish={reset}
         
        >
               <TextInput label={TextConstant.firstname} {...form.getInputProps("firstname")} error={form.errors["firstname"]} key={form.key("firstname")} />

     
<TextInput label={TextConstant.lastname} {...form.getInputProps("lastname")} error={form.errors["lastname"]} key={form.key("lastname")} />


<TextInput label={TextConstant.email} {...form.getInputProps("email")} error={form.errors["email"]} key={form.key("email")} />


<TextInput label={TextConstant.phone} {...form.getInputProps("phone")} error={form.errors["phone"]} key={form.key("phone")} />

<AddressForm form={form}/>

  <Select  label={"Organisation"} error={form.errors["parentId"]} key={form.key("parentId")}{...form.getInputProps("parentId")} data={companies?.data.map((e) =>({label:e.name!, value:`${e.id}`}))}/>





<Select  label={"Role"} error={form.errors["roleId"]} key={form.key("roleId")}{...form.getInputProps("roleId")} data={roles?.children?.map((e) =>({label:e.name!, value:`${e.id}`}))}/>

        </CustomForm>
      )}
    </>
  );
};
