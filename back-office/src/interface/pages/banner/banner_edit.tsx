import {  useParams } from "react-router-dom"
import { useGetBannerByIdQuery, useUpdateBannerMutation } from "../../../core/features/banner.slice"
import { CustomForm } from "../../components/custom_form";
import { useEffect } from "react";
import { Input } from "../../components/input";
import { PreviewerImg } from "../../components/previewer_img";
import { handlePreviewV2 } from "../../utils/handle_preview";
import { BannerDto } from "../../../core/models/banner.dto";
import { TextConstant } from "../../../core/data/textConstant";
import { useForm } from "@mantine/form";
import { Textarea, TextInput } from "@mantine/core";
import {  DateTimePicker } from '@mantine/dates';
export const BannerEdit = () => {
  const {id}=useParams()
  const {data, isSuccess:isOldSuccess,}=useGetBannerByIdQuery(id!);
  const [update,{isSuccess, isLoading, isError, error}]=useUpdateBannerMutation();
  const {handlerFile, preview, setPreview, file}=handlePreviewV2({previewImage:undefined})
  const form=useForm();
  const _onsubmit=form.onSubmit((data)=>{
    console.log(data);
    update({file:file!,id:id!, body:data as BannerDto});
  });
  useEffect(() => {
    if(data){
      setPreview(data.data.imageUrl)
      form.setValues({
        title:data.data.title,
        description:data.data.description,
        type: data.data.type,
        start: data.data.start,
        end: data.data.end,
        
      })
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
   
    <TextInput label={TextConstant.label} {...form.getInputProps('title')} className="input"/>
  
   
    <Textarea  label={TextConstant.description} {...form.getInputProps('description')} className="input"/>
 
    
    <DateTimePicker   {...form.getInputProps('start')} className="input"/>
    
    <DateTimePicker   {...form.getInputProps('end')}  className="input"/>
    
   </CustomForm>
  )
}
