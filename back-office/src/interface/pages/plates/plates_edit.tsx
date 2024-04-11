import { useEffect, useState } from "react";
import { Title } from "../../components/title";
import { CustomForm } from "../../components/custom_form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProductDto, productSchema } from "../../../core/models/product";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../../core/features/product.slice";
import { useParams } from "react-router-dom";
import { Input } from "../../components/input";

import { Alert } from "../../components/alert_success";
import { useGetCategoryQuery } from "../../../core/features/category.slice";
import { ShowCategorySelect } from "./show_category_select";
import { CategoryDto } from "../../../core/models/category.dto";
import { WsMessage } from "../../../core/models/error.dto";
import { ProductCreateFile } from "./product_file_create";
import { ProductFileUpdate } from "./product_file_update";
export const PlatesEdit = () => {
  const [categoryList, setCategoryList] = useState<CategoryDto[]>([]);
  const id = parseInt(useParams().id!);
  const { data: categories, isLoading: isTagLoading } = useGetCategoryQuery("");
  const [update, { isLoading, isSuccess, isError, reset, error }] = useUpdateProductMutation();

  const {
    data: old,
    isLoading: isOldLoading,
  } = useGetProductByIdQuery(id);
  console.log(old)
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
  });
  const _onSubmit = (body: ProductDto) => {
    console.log(body);
    update({ id: id!, product: {...body, category:categoryList},  });
  };
  useEffect(() => {
    if (old) {
      setValue("name", old.data.name);
      setValue("description", old.data.description);
      setValue("price", old.data.price);
      setValue("reduction", old.data.reduction);
 setCategoryList(old.data.category!??[])
     
    }
  }, [old]);

  return (
    <>
    {(isOldLoading || isTagLoading)&&  <Alert isOpen={true} type="loading"  title="Recuperation"/>}
    {  isError&&<Alert isOpen={true} type="faillure"  title="Error" message={(error as WsMessage).message! }/>}:
      {old&&categories&&
        <div className="flex flex-col divide-y darkDivider">
          <Title title={old.data.name} subTitle="Modifier le plat" />
          <div className="flex flex-wrap gap-2 py-2">
            {old?.data.file?.map((e) => (
             <ProductFileUpdate path={e.path!}  id={e.id!} productId={old?.data.id!} />
            ))}
            <ProductCreateFile productId={old.data.id!}/>
            {/* <ImgPreview
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
            /> */}
          </div>

          <CustomForm
            isError={isError}
            isSuccess={isSuccess}
            isLoading={isLoading}
            onSubmit={handleSubmit(_onSubmit)}
            onFinish={reset}
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
            
            >
              <div className="input">
                <div className="   items-start  flex-wrap flex  ">
                <div className="   grid grid-cols-5  gap-3 ">
              {categories?.data[0].children?.map((e) =>
                <ShowCategorySelect key={`key_${e.id}`} categoryList={categoryList} setCategoryList={setCategoryList} category={e} isChild={false}/>
              )}
            </div>
                </div>
              </div>
            </Input>
          </CustomForm>
        </div>
      }
    </>
  );
};
