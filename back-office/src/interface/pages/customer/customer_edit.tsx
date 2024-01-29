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
    setValue("firstname", oldCustomer.firstname),
    setValue("firstname", oldCustomer.firstname),
    setValue("address.city", oldCustomer.address?.city);
    setValue("address.country", oldCustomer.address?.country);
    setValue("address.streetAddress", oldCustomer.address?.streetAddress);
    setValue("phone", oldCustomer.phone);
    setValue("location.latitude", oldCustomer.location?.latitude);
    setValue("location.longitude", oldCustomer.location?.longitude);
    setValue("isPhoneVeirified", oldCustomer.isPhoneVeirified);
    setValue("isEnable", oldCustomer.isEnable);
   }
  }, [oldCustomer, setValue])
  
  return (
    <>
      {<Alert isOpen={isCustomerLoading} />}
      <CustomForm
        title="Client"
        subTitle={`Modifier le client ${oldCustomer?.firstname}`}
        isError={isError}
        isSuccess={isSuccess}
        isLoading={isLoading}
        onSubmit={handleSubmit(_onSubmit)}
      >
        <Input label="Prenom" error={errors.firstname?.message!}>
          <input className="input"   {...register("firstname")}/>
        </Input>
        <Input label="Nom" error={errors.lastname?.message!}>
          <input className="input"   {...register("lastname")}/>
        </Input>
        <Input label="Adresse" >
          <input className="input"  {...register("address.streetAddress")}/>
        </Input>
        <Input label="Laltitude">
          <input className="input" {...register("location.latitude")} />
        </Input>
        <Input label="Logitude">
          <input className="input"  {...register("location.longitude")}/>
        </Input>
      </CustomForm>
    </>
  );
};
