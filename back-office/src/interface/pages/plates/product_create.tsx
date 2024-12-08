import { CustomForm } from "../../components/custom_form";
import { useForm } from "@mantine/form";
import { ProductDto } from "../../../core/models/product";
import { NumberInput, Select, TextInput } from "@mantine/core";
import { TextConstant } from "../../../core/data/textConstant";
import { TimeInput } from "@mantine/dates";
import { companyCategoryApi } from "../../../core/features/company_category.slice";
import { handlePreviewV2 } from "../../utils/handle_preview";
import { ImgWithHandler } from "../../components/img_with_handler";
import { productApi } from "../../../core/features/product.slice";
import { RichTextEditorApp } from "../../components/form/rich_text_description";

export const PlateCreate = () => {
  const companyCategory = companyCategoryApi.useGetQuery();
  const [createPlate, { isError, isSuccess, isLoading, error, data, reset }] =
    productApi.useCreateProductMutation();
  const front = handlePreviewV2({ previewImage: undefined });
  const form = useForm<ProductDto>({
    initialValues: { reduction: 0, cookingTime: "00:00:00", isActive: true },
  });

  const _onSubmit = form.onSubmit((body) => {
    console.log(body);
    createPlate({ product: body as ProductDto, file: front.file! });
  });

  return (
    <CustomForm
      title="Produit"
      subTitle="Création d un nouveau Produit"
      isError={isError}
      isSuccess={isSuccess}
      isLoading={isLoading}
      error={error}
      successMessage={data?.message ?? ""}
      onSubmit={_onSubmit}
      onFinish={reset}
    >
      <ImgWithHandler htmlFor="Profile" {...front} />
      <TextInput
        label={TextConstant.label}
        {...form.getInputProps("name")}
        error={form.errors["name"]}
        key={form.key("name")}
      />

      <RichTextEditorApp
        value={""}
        onChange={(value) => form.setFieldValue("description", value)}
      />

      <NumberInput
        label={TextConstant.price}
        {...form.getInputProps("price")}
        error={form.errors["price"]}
        key={form.key("price")}
      />

      <NumberInput
        label={TextConstant.reduction}
        suffix="%"
        {...form.getInputProps("reduction")}
        error={form.errors["reduction"]}
        key={form.key("reduction")}
      />

      <TimeInput
        label={TextConstant.cookingTime}
        {...form.getInputProps("cookingTime")}
        error={form.errors["cookingTime"]}
        key={form.key("cookingTime")}
      />

      <Select
        error={form.errors["companyCategoryId"]}
        {...form.getInputProps("companyCategoryId")}
        key={form.key("companyCategoryId")}
        label={TextConstant.category}
        data={companyCategory.data?.data.map((e) => ({
          label: e.name!,
          value: `${e.id}`,
        }))}
      />
    </CustomForm>
  );
};
