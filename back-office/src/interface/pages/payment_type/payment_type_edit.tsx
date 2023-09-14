import { useEffect } from "react";
import { Input } from "../../components/input";
import { CustomForm } from "../../components/custom_form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useGetPaymentTypeByIdQuery,
  useUpdatePaymentTypeMutation,
} from "../../../core/features/payment_type.slice";
import { useParams } from "react-router-dom";
import {
  PaymentType,
  paymentTypeSchema,
} from "../../../core/models/payment_type";
import { CustomSwitch } from "../../components/switch";
import { Title } from "../../components/title";
import { ImgPreview } from "../../components/Img_preview";
import { Alert } from "../../components/alert_success";

export const PaymentTypeEdit = () => {
  const id = parseInt(useParams().id!);
  const [update, { isLoading, isError, isSuccess,  }] =
    useUpdatePaymentTypeMutation();
  const { data: oldPaymentType, isLoading: isOldLoading, refetch } =
    useGetPaymentTypeByIdQuery(id);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(paymentTypeSchema),
  });
  const _onsubmit = handleSubmit((body: PaymentType) => {
    console.log(body);
    update({ id: id, paymentType: body });
  });
        useEffect(() => {
                if (oldPaymentType) {
                        setValue("name", oldPaymentType!.name!);
                        setValue("description", oldPaymentType.description);
                        setValue("fees", oldPaymentType.fees);
                        setValue("feesInvert", oldPaymentType.feesInvert);
                        setValue("isActive", oldPaymentType.isActive);

              
        }
        }, [oldPaymentType, setValue])
        
  return (
        isOldLoading?<Alert type="loading" title="recuperation" message="Attendez un instant"/>:  <div>
                  <Title title="Terminaison de Paiement" />
                   <ImgPreview canUpdateAfter={true} refresh={()=>refetch()}  name="paymentt_type" className="h-20" img={oldPaymentType!.profile!}/>
      <CustomForm
        onSubmit={_onsubmit}
        isSuccess={isSuccess}
        isError={isError}
        isLoading={isLoading}
                  >
                          <Input
        label="Nom du Treminaison de Paiement"
        error={errors.name?.message}
      >
        <input type="text" className="input" {...register("name")} />
      </Input>
      <Input label="Description" error={errors.description?.message}>
        <textarea className="input" {...register("description")} />
      </Input>
      <Input label="Frais lors de la transaction" error={errors.fees?.message}>
        <input type="text" className="input" {...register("fees")} />
      </Input>

      <Input label="Frais Chez L 'opérateur" error={errors.feesInvert?.message}>
        <input type="text" className="input" {...register("feesInvert")} />
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
    </div>
  );
};
