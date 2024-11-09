import { useEffect } from "react";
import { CustomForm } from "../../components/custom_form";
import {
  useGetPaymentTypeByIdQuery,
  useUpdatePaymentTypeMutation,
} from "../../../core/features/payment_type.slice";
import { useParams } from "react-router-dom";
import {
  PaymentType,

} from "../../../core/models/payment_type";
import { CustomSwitch } from "../../components/switch";
import { Title } from "../../components/title";
import {  handlePreviewV2 } from "../../utils/handle_preview";
import { useForm } from "@mantine/form";
import { NumberInput, TextInput } from "@mantine/core";
import { TextConstant } from "../../../core/data/textConstant";
import { ImgWithHandler } from "../../components/img_with_handler";

export const PaymentTypeEdit = () => {
  const id = useParams().id!;

  const handleImage = handlePreviewV2({
  
    
  });
  const [update, { isLoading, isError, isSuccess, reset }] =
    useUpdatePaymentTypeMutation();
  const old = useGetPaymentTypeByIdQuery(id);
  const form = useForm({
    mode:"uncontrolled"
  //  initialValues:old.data?.data!
  });
  const _onsubmit = form.onSubmit(async (body: PaymentType) => {
    console.log(body);
    update({ id: id, paymentType: {...body}, file:handleImage.file! });
  });
  useEffect(() => {
    if (old.data) {
      console.log(old.data)
     form.setValues(old.data?.data)
    }
  }, [old.isSuccess]);

  return (
       <div>
      <Title title="Terminaison de Paiement" />
      <ImgWithHandler htmlFor="Couverture" key={'file'} {...handleImage}/>
        <CustomForm

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
        isActive={form.getValues().isActive}
        onClick={(val) =>form.setFieldValue("isActive", val)}
      />
      </div>
    </CustomForm>
    </div>
)
};
