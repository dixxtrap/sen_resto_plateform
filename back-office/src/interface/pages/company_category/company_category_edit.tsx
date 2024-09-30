import { useDisclosure } from "@mantine/hooks";
import { CompanyCategoryDto } from "../../../core/models/company_category.dto"
import { companyCategoryApi } from "../../../core/features/company_category.slice";
import { useForm } from "@mantine/form";
import { inputRequirementValidation } from "../../components/form/validation";
import { ActionIcon, Modal, NumberInput, TextInput } from "@mantine/core";
import { CustomForm } from "../../components/custom_form";
import { AppTextarea } from "../../components/form/app_textarea";
import { TextConstant } from "../../../core/data/textConstant";
import { PencilIcon } from "@heroicons/react/24/outline";
import { CustomSwitchInput } from "../../components/switch";

export const CompanyCategoryEdit = ({cat}:{cat:CompanyCategoryDto}) => {
    const [opened, { close, open }] = useDisclosure();
   
    const [update, createStatus] = companyCategoryApi.useUpdateMutation();
    const form = useForm<CompanyCategoryDto>(
        {
            initialValues:{
                name:cat.name,
                description:cat.description,
                isActive:cat.isActive,
                priority:cat.priority,
            },
            validate: {
                name: inputRequirementValidation
            }
        }
    );
    const _onsubmit = form.onSubmit((data) => {
        console.log(data)
       if(form.validate()){ 
        update({id:`${cat.id}`, body:data}); 
        form.reset();}

    })
  return (
    <>
    <Modal title={<span className="font-bold">Creer une Categorie</span>} opened={opened} onClose={close}>
        <CustomForm successPath="." onSubmit={_onsubmit} {...createStatus}>
            <TextInput label={TextConstant.label} key={form.key("name")} error={form.errors["name"]} {...form.getInputProps("name")} />
            <AppTextarea form={form} />
            <NumberInput label={TextConstant.priority} key={form.key("priority")} error={form.errors["priority"]} {...form.getInputProps("priority")} />
            <CustomSwitchInput itemKey={"isActive"} form={form}/>
        </CustomForm>
    </Modal>
    <ActionIcon color="secondary.4" fw={400} onClick={open}>
       <PencilIcon/>
    </ActionIcon>
</>
  )
}
