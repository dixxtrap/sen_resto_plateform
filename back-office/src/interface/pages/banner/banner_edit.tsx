import {  useParams } from "react-router-dom"
import { useGetBannerByIdQuery, useUpdateBannerMutation } from "../../../core/features/banner.slice"
import { useForm } from "react-hook-form";
import { CustomForm } from "../../components/custom_form";
import { useEffect } from "react";
import { Input } from "../../components/input";
import { PreviewerImg } from "../../components/previewer_img";
import { handlePreviewV2 } from "../../utils/handle_preview";
import { BannerDto, BannerSchema } from "../../../core/models/banner.dto";
import { TextConstant } from "../../../core/data/textConstant";

export const BannerEdit = () => {
  const {id}=useParams()
  const {data, isSuccess:isOldSuccess,}=useGetBannerByIdQuery(id!);
  const [update,{isSuccess, isLoading, isError, error}]=useUpdateBannerMutation();
  const {handlerFile, preview, setPreview, file}=handlePreviewV2({previewImage:undefined})
  const {handleSubmit, register, setValue, formState:{errors}}=useForm(
    {resolver:BannerSchema}
  );
  const _onsubmit=handleSubmit((data)=>{
    console.log(data);
    update({file:file!,id:id!, body:data as BannerDto});
  });
  useEffect(() => {
    if(data){
      setPreview(data.data.imageUrl)
      setValue('title', data.data.title);
      setValue('description', data.data.description);
      setValue('type', data.data.type);
      console.log(data.data.start?.slice(0,16))
      setValue('start', data.data.start?.slice(0,16)! as unknown as Date);
      setValue('end',  data.data.end?.slice(0,16)as  unknown as Date);
    }
  }, [isSuccess,data])

  return (
   <CustomForm onSubmit={_onsubmit} isError={isError} isLoading={isLoading||isOldSuccess} error={error} isSuccess={isSuccess} >
    <Input label="Image" >
        <input
          type="file"
          hidden
          id="file"
          name="file"
          
          onChange={(event) => handlerFile(event)}
        />
        <PreviewerImg preview={preview!} />
      </Input>
    <Input label="label" error={errors.title?.message!}>;
    <input {...register('title')} className="input"/>
    </Input>
     <Input label={TextConstant.description}>
    <textarea  {...register('description')} className="input"/>
    </Input> 
    <Input label="De">
    <input  type='datetime-local' {...register('start')} className="input"/>
    </Input> <Input label="">
    <input  type='datetime-local'  {...register('end')}  className="input"/>
    </Input>
   </CustomForm>
  )
}
