import React from "react";
import { CustomForm } from "../../components/custom_form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Plate, plateSchema } from "../../../core/models/plate";
import { useCreatePlateMutation } from "../../../core/features/plate.slice";
import { Input } from "../../components/input";
import { useGetTagsQuery } from "../../../core/features/tag.slice";
import { Alert } from "../../components/alert_success";
import { WsMessage } from "../../../core/models/error.dto";
export const PlateCreate = () => {
  const { data: tags = [], isLoading: isTagLoading } = useGetTagsQuery("");
  const [createPlate, { isError, isSuccess, isLoading, error, data }] =
    useCreatePlateMutation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(plateSchema),
  });
  const _onSubmit = (body: Plate) => {
    console.log(body);
    const tag = tags.filter((e) =>
      body.tagIds!.find((f: number) => f === e.id)
    );
    console.log(tag);
    createPlate(body);
  };
  return (
    <>
      <Alert isOpen={isTagLoading} type="loading" />
      <CustomForm
        title="Plat"
        subTitle="Création d un nouveau plat"
        isError={isError}
        isSuccess={isSuccess}
        isLoading={isLoading}
        errorMessage={(error as WsMessage | undefined)?.message ?? ""}
        successMessage={data?.message ?? ""}
        onSubmit={handleSubmit(_onSubmit)}
      >
        <Input label="Nom" error={errors.name?.message}>
          <input type="text" className="input" {...register("name")} />
        </Input>
        <Input label="Description" error={errors.description?.message}>
          <textarea className="input" {...register("description")} />
        </Input>
        <Input label="Prix" error={errors.price?.message}>
          <input type="text" className="input" {...register("price")} />
        </Input>
        <Input label="Reduction" error={errors.reduction?.message}>
          <input type="text" className="input" {...register("reduction")} />
        </Input>
        <Input label="Temps de Preparation" error={errors.reduction?.message}>
          <input type="text" className="input" {...register("cookingTime")} />
        </Input>
        <Input
          label="Liste des tags #"
          name="123456"
          error={errors.tagIds?.message}
        >
          <div className="input">
            <div className="   items-start  flex-wrap flex  ">
              {tags?.map((e) => (
                <label
                  htmlFor={e.id + "_tag"}
                  key={e.id + "_tag"}
                  className="ml-4  text-left items-start justify-start  w-52  "
                >
                  <input
                    id={e.id + "_tag"}
                    {...register("tagIds")}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    value={e.id}
                  />{" "}
                  <span> {e.name}</span>
                </label>
              ))}
            </div>
          </div>
        </Input>
      </CustomForm>
    </>
  );
};
