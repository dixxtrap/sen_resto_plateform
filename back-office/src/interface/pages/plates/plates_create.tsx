import { CustomForm } from "../../components/custom_form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {  ProductDto, productSchema } from "../../../core/models/product";
import { useCreateProductMutation } from "../../../core/features/product.slice";
import { Input } from "../../components/input";
import { Alert } from "../../components/alert_success";
import { useGetCategoryQuery } from "../../../core/features/category.slice";
import { CategoryDto } from "../../../core/models/category.dto";
import { useState } from "react";
import { ShowCategorySelect } from "./show_category_select";


export const PlateCreate = () => {
  const { data: categories, isLoading: isTagLoading } =
    useGetCategoryQuery("");
  const [categoryList, setCategoryList] = useState<CategoryDto[]>([]);
  const [createPlate, { isError, isSuccess, isLoading, error, data, reset }] =
    useCreateProductMutation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
  });
  const _onSubmit = (body: ProductDto) => {
    console.log(body);
    createPlate({ ...body, category: categoryList });
  };
  
  return (
    <>
      <Alert isOpen={isTagLoading} type="loading" />
      <CustomForm
        title="Produit"
        subTitle="Création d un nouveau Produit"
        isError={isError}
        isSuccess={isSuccess}
        isLoading={isLoading}
        error={error}
        successMessage={data?.message ?? ""}
        onSubmit={handleSubmit(_onSubmit)}
        onFinish={reset}
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
          // error={errors.ca?.message}
        >
          <div className="input">
            <div className="   grid grid-cols-2 md:grid-cols-4  gap-3 ">
              {categories?.data[0]?.children?.map((e) =>
                <ShowCategorySelect categoryList={categoryList} setCategoryList={setCategoryList} category={e} isChild={false}/>
              )}
            </div>
          </div>
        </Input>
      </CustomForm>
    </>
  );
};
