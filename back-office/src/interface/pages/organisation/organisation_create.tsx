import { useForm } from "@mantine/form";
import { CompanyDto } from "../../../core/models/company.dto";
import { useCreateCompanyMutation } from "../../../core/features/company.slice";
import { CustomForm } from "../../components/custom_form";
import { TextConstant } from "../../../core/data/textConstant";
import {  TextInput } from "@mantine/core";
import { LaltitudeLongituide } from "../../components/form/laltitude_logitude";
import { AddressForm } from "../../components/form/address_form";
import { AppTextarea } from "../../components/form/app_textarea";

export const OrganisationCreate = () => {

  const [createCompany, { isError, isSuccess, isLoading, reset, error }] =
    useCreateCompanyMutation();
  const form = useForm();
  const _onsubmit = form.onSubmit((data: CompanyDto | unknown) => {
    console.log(data);
    createCompany(data as CompanyDto);
  });
  return (
    <div className="flex flex-col divide-y gap-y-2 ">
      
      <CustomForm  title="Compagnie" isLoading={isLoading} isError={isError} isSuccess={isSuccess} error={error}  subTitle="Creer une nouvelle compagnie" onSubmit={_onsubmit} onFinish={reset} >

        <TextInput label={TextConstant.name} {...form.getInputProps("name")} error={form.errors["name"]} key={form.key("name")} />

       
        <TextInput label={TextConstant.shortname} {...form.getInputProps("shortname")} error={form.errors["shortname"]} key={form.key("shortname")} />

       
        <TextInput label={TextConstant.email} {...form.getInputProps("email")} error={form.errors["email"]} key={form.key("email")} />

       
        <TextInput label={TextConstant.phone} {...form.getInputProps("phone")} error={form.errors["phone"]} key={form.key("phone")} />

       
        <AppTextarea form={form} />

        
        <AddressForm form={ form} />
        <LaltitudeLongituide form={form } />

      </CustomForm>
    </div>
  );
};
