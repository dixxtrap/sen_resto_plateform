import { useForm } from "@mantine/form";
import { useCreateCoorporateMutation } from "../../../core/features/coorporate.slice";
import { CustomForm } from "../../components/custom_form";

import { CompanyDto } from "../../../core/models/company.dto";
import { TextInput } from "@mantine/core";
import { LaltitudeLongituide } from "../../components/form/laltitude_logitude";
import { AddressForm } from "../../components/form/address_form";
import { AppTextarea } from "../../components/form/app_textarea";

export const CoorporateCreate = () => {
    const [createCompany, { isError, isSuccess, isLoading, reset , error}] =
    useCreateCoorporateMutation();
  const form = useForm({
  });
  const _onsubmit = form.onSubmit((data: CompanyDto | unknown) => {
    console.log(data);
    createCompany(data as CompanyDto);
  });
  return (
    <div className="flex flex-col divide-y gap-y-2 ">
      
      <CustomForm  title="Coorporate" error={error} isLoading={isLoading} isError={isError} isSuccess={isSuccess}  subTitle="Creer un nouveau Client Coorporate" onSubmit={_onsubmit} onFinish={reset} >
       
        <TextInput  label="Nom" {...form.getInputProps("name")} />
       
        <TextInput   label="Abbréviation" {...form.getInputProps("shortname")} />

       
        <TextInput  label="Email" {...form.getInputProps("email")} />

       
        <TextInput label="Téléphone" {...form.getInputProps("phone")} />

       
        <AppTextarea form={form} />

        
<AddressForm form={form}/>
        <LaltitudeLongituide form={form } />

      </CustomForm>
    </div>
  );
}
