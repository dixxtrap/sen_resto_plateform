import { Input } from "../../components/input";
import { CustomForm } from "../../components/custom_form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  PaymentType,
  paymentTypeSchema,
} from "../../../core/models/payment_type";
import { useCreatePaymentTypeMutation } from "../../../core/features/payment_type.slice";
import { CustomSwitch } from "../../components/switch";

export const PaymentTypeCreate = () => {
  const [create, { isError, isLoading, isSuccess , reset}] =
    useCreatePaymentTypeMutation();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(paymentTypeSchema),
  });
  const _onsubmit = handleSubmit((body: PaymentType) => {
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
      <Input
        label="Nom du Treminaison de Paiement"
        error={errors.name?.message}
      >
        <input type="text" className="input" {...register("name")} />
      </Input>
      <Input
        label="Nom commerciale"
        error={errors.shortname?.message}
      >
        <input type="text" className="input" {...register("shortname")} />
      </Input>
      <Input label="Description" error={errors.description?.message}>
        <textarea className="input" {...register("description")} />
      </Input>
      <Input label="Téléphone" error={errors.phone?.message}>
        <input type="text" className="input" {...register("phone")} />
      </Input><Input label="Email" error={errors.email?.message}>
        <input type="text" className="input" {...register("email")} />
      </Input>
      <Input label="Frais lors de la transaction" error={errors.fees?.message}>
        <input type="text" className="input" {...register("fees")} />
      </Input>

      <Input label="Frais Chez L 'opérateur" error={errors.invertFees?.message}>
        <input type="text" className="input" {...register("invertFees")} />
      </Input>
                  <div className="flex justify-between">
                          <span className="">
                                  Status
                          </span>   
                          <CustomSwitch
        isLoading={false}
        isActive={watch("isActive")!}
        onClick={(val) => setValue("isActive", val)}
      />
      </div>
    </CustomForm>
  );
};
