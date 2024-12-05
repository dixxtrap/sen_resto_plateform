import { useEffect } from "react";
import { CustomForm } from "../../components/custom_form";
import { useParams } from "react-router-dom";
import { shopApi } from "../../../core/features/shop.slice";

import { useForm } from "@mantine/form";
import {  ShopDto } from "../../../core/models/company.dto";
import { Title } from "../../components/title";
import { handlePreviewV2 } from "../../utils/handle_preview";
import { PermisisionTypeEnum, ProtecterPage } from "../../components/protecter_page";
import { TextConstant } from "../../../core/data/textConstant";

import { AppTextarea } from "../../components/form/app_textarea";
import { CustomSwitchInput } from "../../components/switch";
import { TextInput } from "@mantine/core";
import { Fetchingdata } from "../../components/fetching_data";
import { ImgWithHandler } from "../../components/img_with_handler";
import { PlaceAddressForm } from "../../components/form/google_place_address";

export const ShopEdit = () => {
  const { id } = useParams();
  const front = handlePreviewV2({});
  const back = handlePreviewV2({});
  const form = useForm<ShopDto>({});
  const [updateCompany, { isLoading, isSuccess, isError, reset }] =
    shopApi.useUpdateShopByIdMutation();
  const old = shopApi.useGetShopByIdQuery(parseInt(id!));
  const _onSubmit = form.onSubmit(async (body: ShopDto) => {
    console.log(body);
    updateCompany({
      id: parseInt(id!),
      restos: body!,
      file: front.file!,
      background: back.file,
    });
  });
  useEffect(() => {
    if (old.data?.data && old.isSuccess) {
      front.setPreview(old.data.data.backgroundPath!);
      //  form.setValues(old.data.data)
      back.setPreview(old.data.data.backgroundPath);
      const oldaData = old.data.data;
      form.setValues({
        name: oldaData.name,
phone:oldaData.phone,
description:oldaData.description,
        isActive: oldaData.isActive,

        location: { ...oldaData.location! },
      });

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
        <ProtecterPage
          permissions={[{ code: "update_restaurant_profile", type: PermisisionTypeEnum.UPDATE}]}
        >
          <ImgWithHandler htmlFor="Profile" {...front} />
        </ProtecterPage>
        <ImgWithHandler htmlFor="Couverture" {...back} />
      </div>
      <Fetchingdata {...old}>
        <CustomForm
          isError={isError}
          isLoading={isLoading || old.isLoading}
          isSuccess={isSuccess}
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
            label={TextConstant.phone}
            {...form.getInputProps("phone")}
            error={form.errors["phone"]}
            key={form.key("phone")}
          />

          <AppTextarea form={form} />
          <PlaceAddressForm form={form} />

          <CustomSwitchInput itemKey="isActive" form={form} />
          <div className="flex gap-8 w-full flex-wrap">
            {/* <TimeInput label={"Ouverture"} {...form.getInputProps("openingTime")} error={form.errors["openingTime"]} key={form.key("openingTime")} />
      <TimeInput label={"Fermuture"} {...form.getInputProps("closingTime")} error={form.errors["closingTime"]} key={form.key("closingTime")} /> */}
          </div>
        </CustomForm>
      </Fetchingdata>
    </div>
  );
};
