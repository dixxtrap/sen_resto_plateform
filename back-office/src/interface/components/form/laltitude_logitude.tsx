import { NumberInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { TextConstant } from "../../../core/data/textConstant";
import { FC } from "react";
type LaltitudeLongituide = {
  form: UseFormReturnType<any, any>;
};
export const LaltitudeLongituide: FC<LaltitudeLongituide> = ({ form }) => {
  return (
    <div className="flex gap-8  w-full flex-wrap">
      <NumberInput
        className="grow"
        label={TextConstant.laltitude}
        {...form.getInputProps("location.latitude")}
        error={form.errors["location.latitude"]}
        key={form.key("location.latitude")} onChange={(va) => {console.log(`======================${va}=================`)
          form.setFieldValue("location.latitude", va)
        }}
      />

      <NumberInput
        className="grow"
        label={TextConstant.longitude}
        {...form.getInputProps("location.longitude")}
        error={form.errors["location.longitude"]}
        key={form.key("location.longitude")}
        onChange={(va)=>{form.setFieldValue("location.longitude", va)}}
      />
    </div>
  );
};
