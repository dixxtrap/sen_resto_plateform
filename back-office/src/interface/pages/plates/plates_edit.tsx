import { useEffect } from "react";
import { Title } from "../../components/title";
import { CustomForm } from "../../components/custom_form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Plate, plateSchema } from "../../../core/models/plate";
import {
  useGetPlateByIdQuery,
  useUpdatePlateMutation,
} from "../../../core/features/plate.slice";
import { useParams } from "react-router-dom";
import { Input } from "../../components/input";
import { ImgPreview } from "../../components/Img_preview";
import { CameraIcon } from "@heroicons/react/24/outline";
import { CustomSwitch } from "../../components/switch";
import { useGetTagsQuery } from "../../../core/features/tag.slice";
import { Alert } from "../../components/alert_success";
export const PlatesEdit = () => {
  const id = parseInt(useParams().id!);
  const { data: tags, isLoading: isTagLoading } = useGetTagsQuery("");
  const [update, { isLoading, isSuccess, isError }] = useUpdatePlateMutation();

  const {
    data: old,
    isError: isOldError,
    isLoading: isOldLoading,
    refetch,
  } = useGetPlateByIdQuery(id);
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(plateSchema),
  });
  const _onSubmit = (body: Plate) => {
    console.log(body);
    update({ id: id!, plate: body });
  };
  useEffect(() => {
    if (old) {
      setValue("name", old.name);
      setValue("description", old.description);
      setValue("price", old.price);
      setValue("reduction", old.reduction);
      setValue("tag", old.tag);
      setValue("monday", old.monday);
      setValue("tuesday", old.tuesday);
      setValue("wednesday", old.wednesday);
      setValue("thursday", old.thursday);
      setValue("friday", old.friday);
      setValue("saturday", old.saturday);
      setValue("sunday", old.sunday);

      console.log(watch("tagIds"));
    }
  }, [old]);

  return (
    <>
      <Alert isOpen={isOldLoading && isTagLoading} type="loading"  title="Recuperation"/>
      <Alert isOpen={isError} type="loading"  title="Recuperation"/>
      {old&&tags&&
        <div className="flex flex-col divide-y darkDivider">
          <Title title="Plat" subTitle="Modifier le plat" />
          <div className="flex flex-wrap">
            {old?.file?.map((e) => (
              <ImgPreview
                name={`plate_file_${e.id}`}
                className="h-14 w-14 md:h-28 md:w-28 rounded-md"
                img={e.photo}
              />
            ))}
            <ImgPreview
              name={`plate_file_last`}
              canUpdateAfter={true}
              refresh={refetch}
              method="POST"
              url={`/v1/plate/${id}/photo`}
              img={{ size: 0 }}
              className="h-14 w-14 md:h-28 md:w-28 rounded-md"
              icon={
                <CameraIcon className="h-14 w-14 md:h-28 md:w-28 text-indigo-500" />
              }
            />
          </div>

          <CustomForm
            isError={isError}
            isSuccess={isSuccess}
            isLoading={isLoading}
            onSubmit={handleSubmit(_onSubmit)}
          >
            <Input label="Nom du plat" error={errors.name?.message}>
              <input className="input" {...register("name")} />
            </Input>
            <Input label="Prix" error={errors.price?.message}>
              <input className="input" {...register("price")} />
            </Input>
            <Input label="Reduction" error={errors.reduction?.message}>
              <input className="input" {...register("reduction")} />
            </Input>
            <Input label="description" error={errors.description?.message}>
              <textarea className="input" {...register("description")} />
            
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
                      key={e.id + "_tag_label"}
                      className="ml-4  text-left items-start justify-start  w-52  "
                    >
                      <input
                        id={e.id + "_tag"}
                        {...register("tagIds")}
                        type="checkbox"
                        defaultChecked={old!.tag!.some((t) => t.id === e.id)}
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
        </div>
      }
    </>
  );
};
