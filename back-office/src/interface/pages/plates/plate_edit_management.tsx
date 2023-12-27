
import { useEffect } from "react";
import { Title } from "../../components/title";
import { CustomForm } from "../../components/custom_form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Plate, plateSchema } from "../../../core/models/plate";
import {
  useGetPlateByIdQuery,
  useGetPlateManagementByIdQuery,
  useUpdatePlateManagementMutation,
  useUpdatePlateMutation,
} from "../../../core/features/plate.slice";
import { useParams } from "react-router-dom";
import { Input } from "../../components/input";
import { ImgPreview } from "../../components/Img_preview";
import { CustomSwitch } from "../../components/switch";
import { Alert } from "../../components/alert_success";
import { Img } from "../../components/image_updatable";
import { useProfileQuery } from "../../../core/features/security.slice";
import { PlateManagement, platManagementSchema } from "../../../core/models/plate_management";
export const PlateEditManagement = () => {
  const id = parseInt(useParams().id!);
  const [update, { isLoading, isSuccess, isError }] = useUpdatePlateManagementMutation();
const {data:user}=useProfileQuery("")
  const {
    data: old,
    isError: isOldError,
    isLoading: isOldLoading,
    refetch,
  } = useGetPlateManagementByIdQuery(id);
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(platManagementSchema),
  });
  const _onSubmit = (body: PlateManagement) => {
    console.log(body);
    update({ plateId: id!, ...body });
  };
  useEffect(() => {
    if (old) {
//       setValue("name", old.name);
//       setValue("description", old.description);
//       setValue("price", old.price);
//       setValue("reduction", old.reduction);
//       setValue("tag", old.tag);
      setValue("monday", old.monday);
      setValue("tuesday", old.tuesday);
      setValue("wednesday", old.wednesday);
      setValue("thursday", old.thursday);
      setValue("friday", old.friday);
      setValue("saturday", old.saturday);
      setValue("sunday", old.sunday);

//       console.log(watch("tagIds"));
    }
  }, [old]);

  return (
    <>
      <Alert isOpen={isOldLoading } type="loading"  title="Recuperation"/>
      <Alert isOpen={isError} type="loading"  title="Recuperation"/>
      {old&&
        <div className="flex flex-col divide-y darkDivider">
          <Title title="Plat" subTitle="Modifier le plat" />
          <div className="flex flex-wrap">
            {old?.plate?.file?.map((e) => (
              <ImgPreview
                name={`plate_file_${e.id}`}
                className="h-14 w-14 md:h-28 md:w-28 rounded-md"
                img={e.photo}
              />
            ))}
            <Img
             
            
            
           hasImg={true}
              imgId={id}
              className="h-14 w-14 md:h-28 md:w-28 rounded-md"
           
            />
          </div>

          <CustomForm
            isError={isError}
            isSuccess={isSuccess}
            isLoading={isLoading}
            onSubmit={handleSubmit(_onSubmit)}
          >
            <div className="flex justify-between">
              <span>Nom du plat</span>
              <span className="detailsValue">{old.plate?.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Prix</span>
              <span className="detailsValue">{old.plate?.price}</span>
            </div>
            <div className="flex justify-between">
              <span>Reduction</span>
              <span className="detailsValue">{old.plate?.reduction}</span>
            </div>
            <div className="flex  items-start text-start flex-col ">
              <span className="detailsValue">Description</span>
              <span className="">{old.plate?.description}</span>
            </div>
            <div className="flex  items-start text-start flex-col ">
              <span>Tags</span>
              <div>{old.plate?.tag?.map((item)=> <span className="font-bold mr-4 text-opacity-80">#{item.name}</span>)}</div>
            </div>
        
            
              <div className="flex flex-wrap w-full mt-4 gap-x-3">
                <div className="switchBase">
                  <span className="font-semibold mr-3 text-slate-600">
                    Lundi
                  </span>
                  <CustomSwitch
                    isLoading={false}
                    isActive={watch("monday")!}
                    onClick={(val) => setValue("monday", val)}
                  />
                </div>
                <div className="switchBase">
                  <span className="font-semibold mr-3 text-slate-600">
                    Mardi
                  </span>
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
                  <span className="font-semibold mr-3 text-slate-600">
                    Jeudi
                  </span>
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
                  <span className="font-semibold mr-3 text-slate-600">
                    Samedi
                  </span>
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
           
            <Input
              label="Liste des tags #"
              name="123456"
              
            >
              <div className="input">
                <div className="   items-start  flex-wrap flex  ">
                  {/* {tags?.map((e) => (
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
                  ))} */}
                </div>
              </div>
            </Input>
          </CustomForm>
        </div>
      }
    </>
  );
};
