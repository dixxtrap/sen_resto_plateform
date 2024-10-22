import { useEffect } from "react";
import { Title } from "../../components/title";
import { CustomForm } from "../../components/custom_form";
import {
  useGetCompanyByIdQuery,
  useUpdateCompanyByIdMutation,
} from "../../../core/features/company.slice";
import { useForm } from "@mantine/form";
import { CompanyDto } from "../../../core/models/company.dto";
import { useParams } from "react-router-dom";
import { Alert } from "../../components/alert_success";
import {  handlePreviewV2 } from "../../utils/handle_preview";
import { Select, TextInput } from "@mantine/core"; 
import { TextConstant } from "../../../core/data/textConstant";
import { LaltitudeLongituide } from "../../components/form/laltitude_logitude";
import { AddressForm } from "../../components/form/address_form";
import { CustomSwitchInput } from "../../components/switch";
import { establishmentTypeApi } from "../../../core/features/establishment_type.slice";
import { AppTextarea } from "../../components/form/app_textarea";
import { ImgWithHandler } from "../../components/img_with_handler";
import { TimeInput } from "@mantine/dates";

export const OrganisationEdit = () => {
  const id = useParams().id!;

  const { data: establishmentType } = establishmentTypeApi.useGetAllQuery("");


  const {
    data: old,
    isLoading: isOldLoading,
    isSuccess: isOldSuccess,
  } = useGetCompanyByIdQuery(id);
  const front = handlePreviewV2({
    previewImage: old?.data.imagePath,
  });
  const back = handlePreviewV2({
    previewImage: old?.data.backgroundPath,
  });
  const [update, { isError, isSuccess, isLoading, error, reset }] =
    useUpdateCompanyByIdMutation();
  const form = useForm<CompanyDto>({});
  useEffect(() => {
    if (old) {
      front.setPreview(old.data.imagePath);
      back.setPreview(old.data.backgroundPath);
      console.log(old);
      form.setValues({
        name: old.data.name,
        shortname: old.data.shortname,
        email: old.data.email,
        phone: old.data.phone,
        description: old.data.description,
        isActive: old.data.isActive,
        closingTime: old.data.closingTime,
        openingTime: old.data.openingTime,
        establishmentTypeId: `${old.data.establishmentTypeId}`,
        location:{latitude:old.data.location!.latitude,longitude:old.data.location!.longitude}
      });
    }
  }, [isOldSuccess]);

  const _onSubmit = form.onSubmit(async (data: CompanyDto) => {
    console.log(data);
    const { regionId, departementId, municipalityId, ...rest } = data;
    update({ id: parseInt(id), company: rest as CompanyDto, file: front.file!, background: back.file! });
  });
  return !isOldSuccess ? (
    <Alert isOpen={isOldLoading} type="loading" title="Recuperation" />
  ) : (
    <div>
      <div className="flex flex-col justify-start divide-y divide-gray-500/10 gap-y-2 ">
        <Title title="Compagnie" />
        <div className="flex gap-3 md:gap-8 py-3">
          <ImgWithHandler htmlFor="Profile" {...front} />
          <ImgWithHandler htmlFor="Couverture" {...back} />

        </div>

        <CustomForm
          isLoading={isLoading && isOldLoading}
          isError={isError}
          isSuccess={isSuccess}
          error={error}
          subTitle="Creer une nouvelle compagnie"
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
            label={TextConstant.shortname}
            {...form.getInputProps("shortname")}
            error={form.errors["shortname"]}
            key={form.key("shortname")}
          />

          <TextInput
            label={TextConstant.email}
            {...form.getInputProps("email")}
            error={form.errors["email"]}
            key={form.key("email")}
          />

          <TextInput
            label={TextConstant.phone}
            {...form.getInputProps("phone")}
            error={form.errors["phone"]}
            key={form.key("phone")}
          />

          <AppTextarea form={form} />
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
          {old && isOldSuccess && (
            <>
              {" "}
              <AddressForm form={form} isUpdatable />
              <LaltitudeLongituide form={form} />
            </>
          )}
          <div className="flex gap-4">
            <TimeInput label={"Ouverture"} {...form.getInputProps("openingTime")} error={form.errors["openingTime"]} key={form.key("openingTime")} />
            <TimeInput label={"Fermuture"} {...form.getInputProps("closingTime")} error={form.errors["closingTime"]} key={form.key("closingTime")} />

          </div>
          <CustomSwitchInput label="Status" itemKey="isActive" form={form} />
        </CustomForm>
      </div>
    </div>
  );
};
