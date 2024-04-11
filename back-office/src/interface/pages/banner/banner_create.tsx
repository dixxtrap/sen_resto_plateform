import { useForm } from "react-hook-form"
import { useCreateBannerMutation } from "../../../core/features/banner.slice"
import { CustomForm } from "../../components/custom_form";
import { Input } from "../../components/input";
import { useState } from "react";
import { handlePreview } from "../../utils/handle_preview";
import { PreviewerImg } from "../../components/previewer_img";
import { BannerDto, BannerSchema } from "../../../core/models/banner.dto";
import { getWsMessage } from "../../../core/features/error_transformer";

export const BannerCreate = () => {
    const [create, {isLoading, isError, error, isSuccess}]=useCreateBannerMutation();
    const [preview, setPreview]=useState<string>();
    const [file, setFile]=useState<File>();
    const [changed, setChanged]=useState<boolean>(false);
    const handleImage = handlePreview({
        previewImage: preview!,
        setPreviewImage: setPreview,
        setFile: setFile,
        setChanged: setChanged,
      });
    const {handleSubmit, register, formState:{errors}}=useForm({resolver:BannerSchema})
    const _onsubmit=handleSubmit((data)=>{
console.log(file);
create({file:file!, body:data as BannerDto})
    })
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
        <input className="input" {...register("title")} />
      </Input>
      <Input label="description">
        <textarea className="input" {...register("description")} />
      </Input>
      <Input label="Type">
      <select className="input" {...register('type')}>
        {['web','mobile'].map(e=><option className="input" value={e} >{e}</option>)}
      </select>
      </Input>
    
        <div  className=" flex min-w-f gap-4">
        <Input label="A partir  de">
          <input type="datetime-local" className="input grow" {...register("start")} />
        </Input>
        <Input label="A partir de">
          <input type="datetime-local" className="input" {...register("end")} />
        </Input>
        </div>
     
    </CustomForm>
  );
}
