import { Button, Modal, TextInput } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { CustomForm } from "../../components/custom_form"
import { companyCategoryApi } from "../../../core/features/company_category.slice"
import { useForm } from "@mantine/form"
import { CompanyCategoryDto } from "../../../core/models/company_category.dto"
import { inputRequirementValidation } from "../../components/form/validation"
import { TextConstant } from "../../../core/data/textConstant"
import { AppTextarea } from "../../components/form/app_textarea"


export const CompanyCategoryCreate = () => {
    const [opened, { close, open }] = useDisclosure();
    const [create, createStatus] = companyCategoryApi.useCreateMutation();
    const form = useForm<CompanyCategoryDto>(
        {
            validate: {
                name: inputRequirementValidation
            }
        }
    );
    const _onsubmit = form.onSubmit((data) => {
        console.log(data)
       if(form.validate()){ 
        create(data); 
        form.setInitialValues({name:"", description:""});
    }

    })
    return (
        <>
            <Modal title={<span className="font-bold">Creer une Categorie</span>} opened={opened} onClose={close}>
                <CustomForm successPath="." onSubmit={_onsubmit} {...createStatus}>
                    <TextInput label={TextConstant.label} key={form.key("name")} error={form.errors["name"]} {...form.getInputProps("name")} />
                    <AppTextarea form={form} />
                </CustomForm>
            </Modal>
            <Button fw={400} onClick={open}>
                Ajouter Categorie
            </Button>
        </>
    )
}
