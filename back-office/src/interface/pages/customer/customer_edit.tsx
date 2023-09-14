import {useEffect} from "react";
import { CustomForm } from "../../components/custom_form";
import {
  useCustomerByIdQuery,
  useUpdateCustomerMutation,
} from "../../../core/features/customer.slice";
import { useParams } from "react-router-dom";
import { Alert } from "../../components/alert_success";
import { Input } from "../../components/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Customer, customerSchema } from "../../../core/models/customer";

export const CustomerEdit = () => {
  const id = parseInt(useParams().id!);
  const { data: oldCustomer, isLoading: isCustomerLoading } =
    useCustomerByIdQuery(id);
  const [update, { isLoading, isSuccess, isError }] =
    useUpdateCustomerMutation();
  const {
    register,
    handleSubmit,setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(customerSchema),
  });
  const _onSubmit = (body: Customer ) => {
    console.log(body);
    update({customer:body, id:id})
  };
  useEffect(() => {
   if(oldCustomer){
    setValue("displayName", oldCustomer.displayName),
    setValue("adresse", oldCustomer.adresse);
    setValue("phone", oldCustomer.phone);
    setValue("laltitude", oldCustomer.laltitude);
    setValue("longitude", oldCustomer.longitude);
    setValue("isPhoneVeirified", oldCustomer.isPhoneVeirified);
    setValue("isEnable", oldCustomer.isEnable);
   }
  }, [oldCustomer, setValue])
  
  return (
    <>
      {<Alert isOpen={isCustomerLoading} />}
      <CustomForm
        title="Client"
        subTitle={`Modifier le client ${oldCustomer?.displayName}`}
        isError={isError}
        isSuccess={isSuccess}
        isLoading={isLoading}
        onSubmit={handleSubmit(_onSubmit)}
      >
        <Input label="Nom complet">
          <input className="input"   {...register("displayName")}/>
        </Input>
        <Input label="Adresse" >
          <input className="input"  {...register("adresse")}/>
        </Input>
        <Input label="Laltitude">
          <input className="input" {...register("laltitude")} />
        </Input>
        <Input label="Logitude">
          <input className="input"  {...register("longitude")}/>
        </Input>
      </CustomForm>
    </>
  );
};
