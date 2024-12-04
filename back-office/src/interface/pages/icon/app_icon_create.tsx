import { Modal,Button } from "@mantine/core";
import { iconApi } from "../../../core/features/icon.slice";
import { useDisclosure } from "@mantine/hooks";
import { handlePreviewV2 } from "../../utils/handle_preview";
import { ImgWithHandler } from "../../components/img_with_handler";
import {  useEffect } from "react";
import { AppTextarea, FormTextInput } from "../../components/form/app_textarea";
import { useForm } from "@mantine/form";
import { CustomForm } from "../../components/custom_form";

export const AppIconCreate = () => {
    const [opened, {open, close}]=useDisclosure();
  const [create, createState] = iconApi.useCreateMutation();
  const front=handlePreviewV2({})
  const form=useForm()
  const _onSubmit=form.onSubmit((data)=>{
   if(front.file){ create({body:data,file:front.file!,  })}
  })
  useEffect(() => {
   if(createState.isSuccess){
    form.reset();
    close()
   }
  }, [createState.isSuccess])
  
  return (
    <>
      <Modal title={'Creer un nouveau icon'} opened={opened} onClose={close}>
      <CustomForm successPath="." {...createState} onSubmit={_onSubmit}>
      <div className="flex justify-center">
        <ImgWithHandler htmlFor={"Icon"} {...front}/>

        </div>
        <FormTextInput form={form} field="name"label="Titre" />
        <FormTextInput form={form} field="code"  label="Code"/>
        <AppTextarea  form={form}/>
      </CustomForm>

        
        </Modal>
      <Button onClick={open}>Creer un Icon</Button>
    </>
  );
};
