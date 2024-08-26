import { CustomForm } from "../../components/custom_form";
import { useForm } from "@mantine/form";
import {
  PaymentType
} from "../../../core/models/payment_type";
import { useCreatePaymentTypeMutation } from "../../../core/features/payment_type.slice";
import { CustomSwitch } from "../../components/switch";
import { NumberInput, TextInput } from "@mantine/core";
import { TextConstant } from "../../../core/data/textConstant";

export const PaymentTypeCreate = () => {
  const [create, { isError, isLoading, isSuccess , reset}] =
    useCreatePaymentTypeMutation();
  const form= useForm({
  });  
  const _onsubmit = form.onSubmit((body: PaymentType) => {
    console.log(body);
    create(body);
  });
  return (
    <CustomForm
      title="Terminaison de Payment"
      subTitle="Creer un Nouveau Terminaison de payment"
      isError={isError}
      isSuccess={isSuccess}
      isLoading={isLoading}
      onSubmit={_onsubmit}
      onFinish={reset}
    >
     
      <TextInput label={TextConstant.name} {...form.getInputProps("name")} error={form.errors["name"]} key={form.key("name")} />

     
      <TextInput label={TextConstant.shortname} {...form.getInputProps("shortname")} error={form.errors["shortname"]} key={form.key("shortname")} />

    
      <TextInput label={TextConstant.description} {...form.getInputProps("description")} error={form.errors["description"]} key={form.key("description")} />

    
      <TextInput label={TextConstant.phone} {...form.getInputProps("phone")} error={form.errors["phone"]} key={form.key("phone")} />
      
     
      <TextInput label={TextConstant.email} {...form.getInputProps("email")} error={form.errors["email"]} key={form.key("email")} />

     
      <NumberInput suffix="%" label={"Frais lors de la transaction"} {...form.getInputProps("fees")} error={form.errors["fees"]} key={form.key("fees")} />

    
      <NumberInput suffix="%" label={"Frais Chez L 'opérateur"} {...form.getInputProps("invertFees")} error={form.errors["invertFees"]} key={form.key("invertFees")} />

                  <div className="flex justify-between">
                          <span className="">
                                  Status
                          </span>   
                          <CustomSwitch
        isLoading={false}
        isActive={form.watch("isActive", (val)=>{return val})!}
        onClick={(val) =>form.setFieldValue("isActive", val)}
      />
      </div>
    </CustomForm>
  );
};
