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
export const PlatesEdit = () => {
  const id = parseInt(useParams().id!);
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
    }
  }, [old]);

  return (
    <div className="flex flex-col divide-y">
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
          <div className="flex flex-wrap w-full mt-4 gap-x-3">
            <div className="switchBase">
              <span className="font-semibold mr-3 text-slate-600">Lundi</span>
              <CustomSwitch
                isLoading={false}
                isActive={watch("monday")!}
                onClick={(val) => setValue("monday", val)}
              />
            </div>
            <div className="switchBase">
              <span className="font-semibold mr-3 text-slate-600">Mardi</span>
              <CustomSwitch
                isLoading={false}
                isActive={watch("tuesday")!}
                onClick={(val) => setValue("tuesday", val)}
              />
            </div>
            <div className="switchBase">
              <span className="font-semibold mr-3 text-slate-600">
                Mercredi
              </span>
              <CustomSwitch
                isLoading={false}
                isActive={watch("wednesday")!}
                onClick={(val) => setValue("wednesday", val)}
              />
            </div>
            <div className="switchBase">
              <span className="font-semibold mr-3 text-slate-600">Jeudi</span>
              <CustomSwitch
                isLoading={false}
                isActive={watch("thursday")!}
                onClick={(val) => setValue("thursday", val)}
              />
            </div>
            <div className="switchBase">
              <span className="font-semibold mr-3 text-slate-600">
                Vendredi
              </span>
              <CustomSwitch
                isLoading={false}
                isActive={watch("friday")!}
                onClick={(val) => setValue("friday", val)}
              />
            </div>
            <div className="switchBase">
              <span className="font-semibold mr-3 text-slate-600">Samedi</span>
              <CustomSwitch
                isLoading={false}
                isActive={watch("saturday")!}
                onClick={(val) => setValue("saturday", val)}
              />
            </div>
            <div className="switchBase">
              <span className="font-semibold mr-3 text-slate-600">
                Dimanche
              </span>
              <CustomSwitch
                isLoading={false}
                isActive={watch("sunday")!}
                onClick={(val) => setValue("sunday", val)}
              />
            </div>
          </div>
        </Input>
      </CustomForm>
    </div>
  );
};
