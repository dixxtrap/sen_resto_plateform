import { useEffect } from "react";
import { Title } from "../../components/title";
import { CustomForm } from "../../components/custom_form";
import { useForm } from "@mantine/form";
import { ProductDto } from "../../../core/models/product";

import { useParams } from "react-router-dom";

import { ProductCreateFile } from "./product_file_create";
import { ProductFileUpdate } from "./product_file_update";
import {   Select, TextInput } from "@mantine/core";
import { TextConstant } from "../../../core/data/textConstant";
import { AppTextarea } from "../../components/form/app_textarea";
import { CustomSwitchInput } from "../../components/switch";
import { companyCategoryApi } from "../../../core/features/company_category.slice";
import { productApi } from "../../../core/features/product.slice";
export const PlatesEdit = () => {
  const id = parseInt(useParams().id!);
  // const { data: categories, isLoading: isTagLoading } = useGetCategoryQuery("");
  const [update, { isLoading, isSuccess, isError, reset }] =
    productApi.useUpdateProductMutation();
    const companyCategory=companyCategoryApi.useGetQuery();
  const old = productApi.useGetProductByIdQuery(id);
  console.log(old);
  const form = useForm({ mode: "uncontrolled" });
  const _onSubmit = form.onSubmit((body) => {
    console.log(body);
    update({ id: id, product: body as ProductDto });
  });
  useEffect(() => {
    if (old) {
      const { ...rest } = old.data?.data;
      form.setValues({...rest, companyCategoryId:`${rest.companyCategoryId}`});
      
     
    }
  }, [old]);
  console.log("dat------old", old);
  return (
    <>
      
      
    
      {old.data  && (
        <div className="flex flex-col divide-y darkDivider">
          <Title title={old.data?.data.name} subTitle="Modifier le plat" />
          <div className="flex flex-wrap gap-2 py-2">
            {old?.data?.data.file?.map((e) => (
              <ProductFileUpdate
                key={`img_${e.id}`}
                path={e.path!}
                id={e.id!}
                productId={old?.data?.data.id!}
              />
            ))}
            <ProductCreateFile productId={old?.data.data.id!} />
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
            onSubmit={_onSubmit}
            onFinish={reset}
          >
            <TextInput
              label={TextConstant.label}
              {...form.getInputProps("name")}
              error={form.errors["name"]}
              key={form.key("name")}
            />

            <TextInput
              label={TextConstant.price}
              {...form.getInputProps("price")}
              error={form.errors["price"]}
              key={form.key("price")}
            />

            <TextInput
              label={TextConstant.reduction}
              {...form.getInputProps("reduction")}
              error={form.errors["reduction"]}
              key={form.key("reduction")}
            />

            <AppTextarea form={form} />

         
              <Select
               error={form.errors["companyCategoryId"]}
               {...form.getInputProps("companyCategoryId")}
               key={form.key("companyCategoryId")}
               label={TextConstant.category} data={companyCategory.data?.data.map(e=>({label:e.name!, value:`${e.id}`}))}/>
            <CustomSwitchInput itemKey={"isActive"} form={form} />
          </CustomForm>
        </div>
      )}
    </>
  );
};
