import { CustomForm } from "../../components/custom_form";
import { useForm } from "@mantine/form";
import { ProductDto } from '../../../core/models/product';
import { useCreateProductMutation } from "../../../core/features/product.slice";
import { useGetCategoryQuery } from "../../../core/features/category.slice";
import { ComboboxData, MultiSelect, NumberInput, Select, TextInput } from "@mantine/core";
import { TextConstant } from "../../../core/data/textConstant";
import { AppTextarea } from "../../components/form/app_textarea";
import { TimeInput } from "@mantine/dates";
import { multiSelectStyle } from "../../components/form/custom_styles";
import { companyCategoryApi } from "../../../core/features/company_category.slice";


export const PlateCreate = () => {
  const { data: categories, isLoading: isTagLoading } =
    useGetCategoryQuery("");
    const companyCategory=companyCategoryApi.useGetQuery();
  const [createPlate, { isError, isSuccess, isLoading, error, data, reset }] =
    useCreateProductMutation();
  const form = useForm({
    initialValues:{
description:"No description"
    }
  });
  const _onSubmit = form.onSubmit((body) => {
    console.log(body);
    createPlate({ ...body as ProductDto });
  });
  
  return (
  
      <CustomForm
        title="Produit"
        subTitle="Création d un nouveau Produit"
        isError={isError}
        isSuccess={isSuccess}
        isLoading={isLoading||isTagLoading}
        error={error}
        successMessage={data?.message ?? ""}
        onSubmit={_onSubmit}
        onFinish={reset}
      >
       
      <TextInput label={TextConstant.label} {...form.getInputProps("name")} error={form.errors["name"]} key={form.key("name")} />

        
      <AppTextarea  form={form} />

      
      <NumberInput label={TextConstant.price} {...form.getInputProps("price")} error={form.errors["price"]} key={form.key("price")} />

       
      <NumberInput label={TextConstant.reduction} suffix="%" {...form.getInputProps("reduction")} error={form.errors["reduction"]} key={form.key("reduction")} />

      
      <TimeInput label={TextConstant.cookingTime} {...form.getInputProps("cookingTime")} error={form.errors["cookingTime"]} key={form.key("cookingTime")} />
      <MultiSelect searchable {...form.getInputProps('categoryIds')} label="Liste des tags #" classNames={{ pill: 'bg-opacity-5' }}
          styles={multiSelectStyle}
          data={categories?.data[0]?.children?.map(e => ({ group: e.name, items: e.children?.map(c => ({ label: c.name!, value: `${c.id}` })), })) as ComboboxData} />
    
        <Select 
         error={form.errors["companyCategoryId"]}
         {...form.getInputProps("companyCategoryId")}
         key={form.key("companyCategoryId")}
        label={TextConstant.category} data={companyCategory.data?.data.map(e=>({label:e.name!, value:`${e.id}`}))}/>
      </CustomForm>

  );
};
