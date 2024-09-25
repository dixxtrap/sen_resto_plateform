import { Button, Modal,Image, TextInput } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { CustomForm } from "../../components/custom_form"
import { useForm } from "@mantine/form"
import { handlePreviewV2 } from "../../utils/handle_preview"
import { PhotoIcon } from "@heroicons/react/24/solid"
import { AppTextarea } from "../../components/form/app_textarea"
import { establishmentTypeApi } from '../../../core/features/establishment_type.slice';
import { inputRequirementValidation } from "../../components/form/validation"

export const EstablishmentTypeCreate = () => {
    const [opened, {close, open}]=useDisclosure(false)
    const{handlerFile, preview,file} =handlePreviewV2({});
    const [create, state]=establishmentTypeApi.useCreateMutation();
    const form=useForm({initialValues:{
        name:"",
        description:""
    }, validate: {
        name:(v)=>{return inputRequirementValidation(v)}
    },});
   const  _onSubmit=form.onSubmit((value)=>{
if(form.validate()){
create({file:file!,body:value})
}
    })
    return (
        <>

        <Modal  title={<span className="font-bold">Creer un Type d Etablissement</span>} opened={opened} onClose={close}>
       
          

       
        <CustomForm {...state} successPath="." onSubmit={_onSubmit}>
        <label   className=" mx-auto">
            <input type="file" hidden onChange={handlerFile}></input>
            {file?<Image className="h-20 w-auto mx-auto" src={preview!}/>:<PhotoIcon className="h-20 w-auto mx-auto" />}
            </label>
            <TextInput key={form.key("name")} {...form.getInputProps("name")} label="Label"/>
            <AppTextarea form={form}/>
        </CustomForm>
        </Modal>
        <Button color={"secondary.4"} fw={400} onClick={open}>EstablishmentTypeCreate</Button>
      </>
    )
  }
  