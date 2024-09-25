import { useEffect, useState } from "react";
import { Title } from "../../components/title";
import { CustomForm } from "../../components/custom_form";
import { useForm } from "@mantine/form";
import { ProductDto } from "../../../core/models/product";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../../core/features/product.slice";
import { useParams } from "react-router-dom";

import { Alert } from "../../components/alert_success";
import { useGetCategoryQuery } from "../../../core/features/category.slice";
import { CategoryDto } from "../../../core/models/category.dto";
import { WsMessage } from "../../../core/models/error.dto";
import { ProductCreateFile } from "./product_file_create";
import { ProductFileUpdate } from "./product_file_update";
import { ComboboxData, MultiSelect, TextInput } from "@mantine/core";
import { TextConstant } from "../../../core/data/textConstant";
import { AppTextarea } from "../../components/form/app_textarea";
import { multiSelectStyle } from "../../components/form/custom_styles";
import { CustomSwitchInput } from "../../components/switch";
export const PlatesEdit = () => {
  const [_, setCategoryList] = useState<CategoryDto[]>([]);
  const id = parseInt(useParams().id!);
  const { data: categories, isLoading: isTagLoading } = useGetCategoryQuery("");
  const [update, { isLoading, isSuccess, isError, reset, error }] =
    useUpdateProductMutation();

  const { data: old, isLoading: isOldLoading } = useGetProductByIdQuery(id);
  console.log(old);
  const form = useForm({ mode: "uncontrolled" });
  const _onSubmit = form.onSubmit((body) => {
    console.log(body);
    update({ id: id, product: body as ProductDto });
  });
  useEffect(() => {
    if (old) {
      const { category, file, ...rest } = old.data;
      form.setValues(rest);
      form.setFieldValue(
        "categoryIds",
        old.data.category?.map((e) => `${e.id}`)
      );
      setCategoryList(old.data.category! ?? []);
    }
  }, [old]);
  console.log("dat------old", old);
  return (
    <>
      {isOldLoading && isTagLoading && (
        <Alert isOpen={true} type="loading" title="Recuperation" />
      )}
      {isError && (
        <Alert
          isOpen={true}
          type="faillure"
          title="Error"
          message={(error as WsMessage).message!}
        />
      )}
      :
      {old && categories && (
        <div className="flex flex-col divide-y darkDivider">
          <Title title={old.data.name} subTitle="Modifier le plat" />
          <div className="flex flex-wrap gap-2 py-2">
            {old?.data.file?.map((e) => (
              <ProductFileUpdate
                key={`img_${e.id}`}
                path={e.path!}
                id={e.id!}
                productId={old?.data.id!}
              />
            ))}
            <ProductCreateFile productId={old.data.id!} />
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
              label={TextConstant.name}
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

            <MultiSelect
              searchable
              error={form.errors["categoryIds"]}
              {...form.getInputProps("categoryIds")}
              key={form.key("categoryIds")}
              label="Liste des tags #"
              classNames={{ pill: "bg-opacity-5" }}
              styles={multiSelectStyle}
              data={
                categories?.data[0]?.children?.map((e) => ({
                  group: e.name,
                  items: e.children?.map((c) => ({
                    label: c.name!,
                    value: `${c.id}`,
                  })),
                })) as ComboboxData
              }
            />
            <CustomSwitchInput itemKey={"isActive"} form={form} />
          </CustomForm>
        </div>
      )}
    </>
  );
};
