import { useEffect } from "react";
import { CustomForm } from "../../components/custom_form";
import { useParams } from "react-router-dom";
import {
  useGetRestaurantByIdQuery,
  useUpdateRestaurantByIdMutation,
} from "../../../core/features/restaurant.slice";

import { useForm } from "@mantine/form";
import { CompanyDto,  } from "../../../core/models/company.dto";
import { Title } from "../../components/title";
import {  handlePreviewV2 } from "../../utils/handle_preview";
import { ProtecterPage } from "../../components/protecter_page";
import { TextConstant } from "../../../core/data/textConstant";
import { TimeInput } from "@mantine/dates";
import { LaltitudeLongituide } from "../../components/form/laltitude_logitude";
import { AddressForm } from "../../components/form/address_form";
import { AppTextarea } from "../../components/form/app_textarea";
import { CustomSwitchInput } from "../../components/switch";
import { Select, TextInput } from "@mantine/core";
import { Fetchingdata } from "../../components/fetching_data";
import { establishmentTypeApi } from "../../../core/features/establishment_type.slice";
import { ImgWithHandler } from "../../components/img_with_handler";

export const RestaurantEdit = () => {
  const { id } = useParams();
  const {data:establishmentType, }=establishmentTypeApi.useGetAllQuery('')
  const front=handlePreviewV2({})
  const back=handlePreviewV2({})
  const form = useForm<CompanyDto>({});
  const [updateCompany, { isLoading, isSuccess, isError, reset }] =
    useUpdateRestaurantByIdMutation();
  const old =
    useGetRestaurantByIdQuery(parseInt(id!));
  const _onSubmit =form.onSubmit(async  (body: CompanyDto) => {
    console.log(body)
    updateCompany({
      id: parseInt(id!), restos: body!, file: front.file!,
      background: back.file
    });
  });
  useEffect(() => {
    if (old.data?.data&& old.isSuccess) {
      front.setPreview(old.data.data.imagePath!);
    //  form.setValues(old.data.data)
    back.setPreview(old.data.data.backgroundPath);
    const oldaData= old.data.data
    form.setValues({
      name:oldaData.name,
      shortname:oldaData.shortname,
      phone:oldaData.phone,
      email:oldaData.email,
      description:oldaData.description,
      isActive:oldaData.isActive,
      closingTime:oldaData.closingTime,
      openingTime:oldaData.openingTime,
    location:{...oldaData.location!},
    establishmentTypeId:oldaData.establishmentTypeId,
    })
  
    // form.setFieldValue("address.streetAddress", old.data.data.description)
    }
  }, [old.data]);

  return (
    <div className="flex flex-col justify-start">
      <Title
        title="Restaurant"
        subTitle={"Modifier le restaurant" + " " + old.data?.data?.name}
      />
  
    <div className="flex ">
       <ProtecterPage permissions={[{code:"update_restaurant_profile", type:"update"}]}>
       <ImgWithHandler htmlFor="Profile" {...front }/>
       </ProtecterPage>
       <ImgWithHandler htmlFor="Couverture" {...back }/>

     </div>
     <Fetchingdata {...old}>
     <CustomForm
      
      isError={isError}
      isLoading={isLoading ||old.isLoading}
      isSuccess={isSuccess}
    
      onSubmit={_onSubmit}
     onFinish={reset}
    >
      
    
      <TextInput label={TextConstant.name} {...form.getInputProps("name")} error={form.errors["name"]} key={form.key("name")} />

     
      <TextInput label={TextConstant.shortname} {...form.getInputProps("shortname")} error={form.errors["shortname"]} key={form.key("shortname")} />

      
      <TextInput label={TextConstant.email} {...form.getInputProps("email")} error={form.errors["email"]} key={form.key("email")} />

     
      <TextInput label={TextConstant.phone} {...form.getInputProps("phone")} error={form.errors["phone"]} key={form.key("phone")} />

     

      <AppTextarea form={form}/>
        <AddressForm form={ form} isUpdatable />
        {establishmentType && (
            <Select
              {...form.getInputProps("establishmentTypeId")}
              error={form.errors["establishmentTypeId"]}
              key={form.key("establishmentTypeId")}
              label={"Type"}
              data={establishmentType!.data!.map((e) => ({
                label: e.name!,
                value: `${e.id}`,
              }))}
            />
          )}
        <LaltitudeLongituide form={ form } />
        <CustomSwitchInput itemKey="isActive" form={form}/>
      <div className="flex gap-8 w-full flex-wrap">
        
      <TimeInput label={"Ouverture"} {...form.getInputProps("openingTime")} error={form.errors["openingTime"]} key={form.key("openingTime")} />
      <TimeInput label={"Fermuture"} {...form.getInputProps("closingTime")} error={form.errors["closingTime"]} key={form.key("closingTime")} />

  
      </div>
    </CustomForm >
    </Fetchingdata>
    </div>
  );
};
