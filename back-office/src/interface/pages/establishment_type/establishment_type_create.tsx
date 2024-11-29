import { Button, Modal, TextInput } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { CustomForm } from "../../components/custom_form"
import { useForm } from "@mantine/form"
import { handlePreviewV2 } from "../../utils/handle_preview"
import { AppTextarea } from "../../components/form/app_textarea"
import { establishmentTypeApi } from '../../../core/features/establishment_type.slice';
import { inputRequirementValidation } from "../../components/form/validation"
import { ImgWithHandler } from "../../components/img_with_handler"

export const EstablishmentTypeCreate = () => {
    const [opened, {close, open}]=useDisclosure(false)
    const front =handlePreviewV2({});
    const back =handlePreviewV2({});
    const [create, state]=establishmentTypeApi.useCreateMutation();
    const form=useForm({initialValues:{
        name:"",
        description:""
    }, validate: {
        name:(v)=>{return inputRequirementValidation(v)}
    },});
   const  _onSubmit=form.onSubmit((value)=>{
if(form.validate()){
create({file:front.file!,background:back.file!,body:value})
}
    })
    return (
        <>

        <Modal  title={<span className="font-bold">Creer un Type d Etablissement</span>} opened={opened} onClose={close}>
       <div className="flex  gap-3">
       <ImgWithHandler htmlFor={"logo"} {...front}/>
       <ImgWithHandler htmlFor={"background"} {...back}/>

       </div>

       
        <CustomForm {...state} successPath="." onSubmit={_onSubmit}>
       
            <TextInput key={form.key("name")} {...form.getInputProps("name")} label="Label"/>
            <AppTextarea form={form}/>
        </CustomForm>
        </Modal>
        <Button color={"secondary.4"} fw={400} onClick={open}>Ajouter</Button>
      </>
    )
  }
  