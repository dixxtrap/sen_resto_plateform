import { useEffect, useState } from "react";
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
import { Alert } from "../../components/alert_success";
import { handlePreview } from "../../utils/handle_preview";
import { CameraIcon } from "@heroicons/react/20/solid";

export const PaymentTypeEdit = () => {
  const id = useParams().id!;
  const [preview, setPreview] = useState<string>();
  const [file, setFile] = useState<File>();
  const [changed, setChanged] = useState<boolean>(false);
  console.log(changed);
  const handleImage = handlePreview({
    previewImage: preview!,
    setPreviewImage: setPreview,
    setFile: setFile,
    setChanged: setChanged,
  });
  const [update, { isLoading, isError, isSuccess, reset }] =
    useUpdatePaymentTypeMutation();
  const {
    data: old,
    isLoading: isOldLoading,
  } = useGetPaymentTypeByIdQuery(id);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
   
    formState: { errors },
  } = useForm({
    resolver: yupResolver(paymentTypeSchema),
  });
  const _onsubmit = handleSubmit(async (body: PaymentType) => {
    console.log(body);
   
    update({ id: id, paymentType: body, file:file! });
  });
  useEffect(() => {
    if (old) {
      setValue("name", old?.data.name!);
      setValue("shortname", old?.data!.shortname!);
      setValue("phone", old?.data!.phone!);
      setValue("email", old?.data!.email!);
      setValue("description", old?.data.description);
      setValue("fees", old?.data.fees);
      setValue("invertFees", old?.data.invertFees);
      setValue("isActive", old?.data.isActive);
    }
  }, [old, setValue]);

  return isOldLoading ? (
    <Alert type="loading" title="recuperation" message="Attendez un instant" />
  ) : (
    <div>
      <Title title="Terminaison de Paiement" />
      <label htmlFor="file">
        <input type="file" hidden  id="file" name="file" onChange={(event)=>handleImage(event)}/>
        {preview?<img title="payment type" src={preview} className="h-20"/>:old?.data.imagePath?<img title="payment type" src={`${old?.data?.imagePath}`} className="h-20"/>:<CameraIcon className="h-20 text-secondary-500"/>}
        </label>
      <CustomForm
        onSubmit={_onsubmit}
        isSuccess={isSuccess}
        isError={isError}
        isLoading={isLoading}
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
    </div>
  );
};
