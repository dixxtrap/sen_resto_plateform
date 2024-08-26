import { useCreateBannerMutation } from "../../../core/features/banner.slice"
import { CustomForm } from "../../components/custom_form";
import { Input } from "../../components/input";
import { useState } from "react";
import { handlePreview } from "../../utils/handle_preview";
import { PreviewerImg } from "../../components/previewer_img";
import { BannerDto } from "../../../core/models/banner.dto";
import {useForm} from "@mantine/form"
import { DateInput } from "@mantine/dates";
import { AppTextarea } from "../../components/form/app_textarea";
export const BannerCreate = () => {
    const [create, {isLoading, isError, error, isSuccess}]=useCreateBannerMutation();
    const [preview, setPreview]=useState<string>();
    const [file, setFile]=useState<File>();
    const [, setChanged]=useState<boolean>(false);
    const handleImage = handlePreview({
        previewImage: preview!,
        setPreviewImage: setPreview,
        setFile: setFile,
        setChanged: setChanged,
      });
    const form=useForm<BannerDto>({})
    const _onsubmit=form.onSubmit((data)=>{
console.log(file);
create({file:file!, body:data as BannerDto})
    })
    const minDate=form.getValues().start;
  return (
    <CustomForm
      onSubmit={_onsubmit}
      isError={isError}
      isLoading={isLoading}
      isSuccess={isSuccess}
      error={error}
      title="Creation de spot publicitaire"
    >
      <Input label="Image">
        <input
          type="file"
          hidden
          id="file"
          name="file"
          onChange={(event) => handleImage(event)}
        />
        <PreviewerImg preview={preview!} />
      </Input>
      <Input label="Titre">
        <input className="input" {...form.getInputProps("title")} />
      </Input>
    <AppTextarea form={form}/>
      <Input label="Type">
      <select className="input" {...form.getInputProps('type')}>
        {['web','mobile'].map(e=><option className="input" value={e} >{e}</option>)}
      </select>
      </Input>
    
        <div  className=" flex min-w-f gap-4">
        <DateInput withAsterisk  flex={1} {...form.getInputProps("start")} key={form.key('start')} label="A partir  de"/>
        <DateInput minDate={new Date(minDate!)} withAsterisk  flex={1} {...form.getInputProps("end")} key={form.key('end')} label="A la date De"/>

        </div>

     
    </CustomForm>
  );
}
