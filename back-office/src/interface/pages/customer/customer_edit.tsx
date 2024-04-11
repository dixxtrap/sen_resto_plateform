import {useEffect} from "react";
import { CustomForm } from "../../components/custom_form";
import {
  useGetCustomerByIdQuery,
  useUpdateCustomerMutation,
} from "../../../core/features/customer.slice";
import { useParams } from "react-router-dom";
import { Alert } from "../../components/alert_success";
import { Input } from "../../components/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Customer, customerSchema } from "../../../core/models/customer";
import { TextConstant } from "../../../core/data/textConstant";

export const CustomerEdit = () => {
  const {id} = useParams();
  const { data: oldCustomer, isLoading: isCustomerLoading } =
  useGetCustomerByIdQuery(id!);
  const [update, { isLoading, isSuccess, isError , error}] =
    useUpdateCustomerMutation();
  const {
    register,
    handleSubmit,setValue,
    formState: { errors },
  } = useForm({
 resolver:yupResolver(customerSchema)
  });
  const _onSubmit = handleSubmit((body ) => {
    console.log(body);
    update({customer:body as Customer, id:id!})
  });
  useEffect(() => {
   if(oldCustomer){
    setValue("firstname", oldCustomer.data.firstname),
    setValue("lastname", oldCustomer.data.firstname),
  

    setValue("phone", oldCustomer.data.phone);
    setValue("isPhoneVeirified", oldCustomer.data.isPhoneVeirified??false);
    setValue("isActive", oldCustomer.data.isActive??true);
   }
  }, [oldCustomer, setValue])
  
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
        <Input label={TextConstant.firstname} error={errors.firstname?.message!}>
          <input className="input"   {...register("firstname")}/>
        </Input>
        <Input label={TextConstant.lastname} error={errors.lastname?.message!}>
          <input className="input"   {...register("lastname")}/>
        </Input>
        <Input label={TextConstant.phone} error={errors.phone?.message!}>
          <input className="input"   {...register("phone")}/>
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
