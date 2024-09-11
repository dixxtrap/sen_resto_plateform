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
import { TextInput } from "@mantine/core";
import {  DateInput } from '@mantine/dates';
import { Fetchingdata } from "../../components/fetching_data";
import { AppTextarea } from "../../components/form/app_textarea";
export const BannerEdit = () => {
  const {id}=useParams()
  const old=useGetBannerByIdQuery(id!);
  const [update,{isSuccess, isLoading, isError, error}]=useUpdateBannerMutation();
  const {handlerFile, preview, setPreview, file}=handlePreviewV2({previewImage:undefined})
  const form=useForm();
  const _onsubmit=form.onSubmit((data)=>{
    console.log(data);
    update({file:file!,id:id!, body:data as BannerDto});
  });
  useEffect(() => {
    if(old && old.data){
      setPreview(old.data.data.imageUrl)
      form.setValues({
        title:old.data.data.title,
        description:old.data.data.description,
        type: old.data.data.type,
        start: new Date(old.data.data.start!),
        end: new Date(old.data.data.end!),
        
      })
    }
  }, [isSuccess,old.data])

  return (
    <Fetchingdata {...old}>
   <CustomForm onSubmit={_onsubmit} isError={isError} isLoading={isLoading} error={error} isSuccess={isSuccess} >
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
   
    <TextInput label={TextConstant.label} {...form.getInputProps('title')} />
  
   
    <AppTextarea  form={form}/>
 
    
    <DateInput   {...form.getInputProps('start')} />
    
    <DateInput   {...form.getInputProps('end')}  />
    
   </CustomForm>
   </Fetchingdata>
  )
}
