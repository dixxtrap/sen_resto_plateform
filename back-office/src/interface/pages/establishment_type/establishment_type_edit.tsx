import { ActionIcon, Modal , Image, TextInput} from '@mantine/core';
import { EstablishmentTypeDto } from '../../../core/models/establishment_type.dto';
import { useDisclosure } from '@mantine/hooks';
import { PencilIcon, PhotoIcon } from '@heroicons/react/20/solid';
import { handlePreviewV2 } from '../../utils/handle_preview';
import { CustomForm } from "../../components/custom_form";
import { inputRequirementValidation } from '../../components/form/validation';
import { useForm } from '@mantine/form';
import { AppTextarea } from '../../components/form/app_textarea';
import { CustomSwitchInput } from '../../components/switch';
import { establishmentTypeApi } from '../../../core/features/establishment_type.slice';

export const EstablishmentTypeEdit = ({body}:{body:EstablishmentTypeDto}) => {
    const[opened, {close, open}]= useDisclosure();
    const [update, state]=establishmentTypeApi.useUpdateMutation()
    const{preview, handlerFile,file}=handlePreviewV2({previewImage:body.imagePath!})
    const form=useForm({initialValues:{
        name:body.name,
        description:body.description,
        isActive:body.isActive,
        imagePath:body.imagePath
    }, validate: {
        name:(v)=>{return inputRequirementValidation(v)}
    },});
    const _onSubmit=form.onSubmit((value)=>{
if(form.validate()){
    update({file:file!,body:value, id:`${body.id}` })
}
    })
    return (
      <>
      <Modal title={<span className='font-bold'>{body.name}</span>} opened={opened} onClose={close}>
      <CustomForm {...state} successPath='.' onSubmit={_onSubmit} >
      <label   className=" mx-auto">
            <input type="file" hidden onChange={handlerFile}></input>
            {preview?<Image className="h-20 w-auto rounded-md mx-auto" src={preview!}/>:<PhotoIcon className="h-20 w-auto mx-auto rounded-md" />}
            </label>
            <TextInput key={form.key("name")} {...form.getInputProps("name")} label="Label"/>
            <AppTextarea form={form}/>
            <CustomSwitchInput itemKey={'isActive'} form={form} />
        </CustomForm>
        </Modal>
      <ActionIcon onClick={open}>
        <PencilIcon/>
      </ActionIcon>
      </>
    )
  }
  