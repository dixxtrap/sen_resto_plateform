import { ActionIcon, Modal , TextInput} from '@mantine/core';
import { EstablishmentTypeDto } from '../../../core/models/establishment_type.dto';
import { useDisclosure } from '@mantine/hooks';
import { handlePreviewV2 } from '../../utils/handle_preview';
import { CustomForm } from "../../components/custom_form";
import { inputRequirementValidation } from '../../components/form/validation';
import { useForm } from '@mantine/form';
import { AppTextarea } from '../../components/form/app_textarea';
import { CustomSwitchInput } from '../../components/switch';
import { establishmentTypeApi } from '../../../core/features/establishment_type.slice';
import { IconPencil } from '@tabler/icons-react';
import { ImgWithHandler } from '../../components/img_with_handler';

export const EstablishmentTypeEdit = ({body}:{body:EstablishmentTypeDto}) => {
    const[opened, {close, open}]= useDisclosure();
    const [update, state]=establishmentTypeApi.useUpdateMutation()
    const front=handlePreviewV2({previewImage:body.imagePath!})
    const back=handlePreviewV2({previewImage:body.backgroundPath!})
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
    update({file:front.file!, background:back.file!,body:value, id:`${body.id}` })
}
    })
    return (
      <>
      <Modal title={<span className='font-bold'>{body.name}</span>} opened={opened} onClose={close}>
      <CustomForm {...state} successPath='.' onSubmit={_onSubmit} >
      <div className="flex  gap-3">
             <ImgWithHandler htmlFor={"logo"} {...front}/>
             <ImgWithHandler htmlFor={"background"} {...back}/>
      
             </div>
            <TextInput key={form.key("name")} {...form.getInputProps("name")} label="Label"/>
            <AppTextarea form={form}/>
            <CustomSwitchInput itemKey={'isActive'} form={form} />
        </CustomForm>
        </Modal>
      <ActionIcon variant='outline' onClick={open}>
        <IconPencil/>
      </ActionIcon>
      </>
    )
  }
  