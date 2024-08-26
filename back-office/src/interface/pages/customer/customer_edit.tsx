import {useEffect} from "react";
import { CustomForm } from "../../components/custom_form";
import {
  useGetCustomerByIdQuery,
  useUpdateCustomerMutation,
} from "../../../core/features/customer.slice";
import { useParams } from "react-router-dom";
import { useForm } from "@mantine/form";
import { Customer } from "../../../core/models/customer";
import { TextConstant } from "../../../core/data/textConstant";
import { TextInput } from "@mantine/core";
import { AddressForm } from "../../components/form/address_form";
import { LaltitudeLongituide } from "../../components/form/laltitude_logitude";

export const CustomerEdit = () => {
  const {id} = useParams();
  const { data: oldCustomer, isLoading: isCustomerLoading } =
  useGetCustomerByIdQuery(id!);
  const [update, { isLoading, isSuccess, isError , error}] =
    useUpdateCustomerMutation();
  const form= useForm({
 
  });
  const _onSubmit = form.onSubmit((body ) => {
    console.log(body);
    update({customer:body as Customer, id:id!})
  });
  useEffect(() => {
   if(oldCustomer){
form.setValues(oldCustomer.data)
   }
  }, [oldCustomer])
  
  return (
    <>
      
      <CustomForm
        title="Client"
        subTitle={`Modifier le client ${oldCustomer?.data?.firstname}`}
        isError={isError}
        isSuccess={isSuccess}
        isLoading={isLoading||isCustomerLoading}
        error={error}
        onSubmit={_onSubmit}
      >
       
        <TextInput label={TextConstant.firstname} {...form.getInputProps("firstname")} error={form.errors["firstname"]} key={form.key("firstname")} />

        
        <TextInput label={TextConstant.lastname} {...form.getInputProps("lastname")} error={form.errors["lastname"]} key={form.key("lastname")} />

      
        <TextInput label={TextConstant.phone} {...form.getInputProps("phone")} error={form.errors["phone"]} key={form.key("phone")} />
<AddressForm form={form} isUpdatable/>
        
<LaltitudeLongituide form={form}/>
        
      </CustomForm>
    </>
  );
};
