import { Modal } from "@mantine/core";
import { TableActionItemFonction } from "../../components/table/action_item";
import { useDisclosure } from "@mantine/hooks";
import { IconDto } from "../../../core/models/icon.dto";
import { CustomForm } from "../../components/custom_form";
import { AppTextarea, FormTextInput } from "../../components/form/app_textarea";
import { ImgWithHandler } from "../../components/img_with_handler";
import { useForm } from "@mantine/form";
import { iconApi } from "../../../core/features/icon.slice";
import { handlePreviewV2 } from "../../utils/handle_preview";
import { useEffect } from "react";

export const AppIconUpdate = ({ icon }: { icon: IconDto }) => {
  const [update, updateState] = iconApi.useUpdateMutation();
  const [opened, { open, close }] = useDisclosure();
  const form = useForm({
    initialValues: {
      name: icon.name,
      description: icon.description,
      code: icon.code,
    },
  });
  const front = handlePreviewV2({ previewImage: icon.imagePath });
  const _onSubmit = form.onSubmit((data) => {
    update({ id: icon.id!, body: data, file: front.file! });
  });
  useEffect(() => {
    if (updateState.isSuccess) {
      updateState.reset();
    }
  }, [updateState.isSuccess]);

  return (
    <>
      <Modal
        opened={opened}
        title={<span>Modifier {icon.name} </span>}
        onClose={close}
      >
        <CustomForm successPath="." {...updateState} onSubmit={_onSubmit}>
          <div className="flex justify-center">
            <ImgWithHandler htmlFor={"Icon"} {...front} />
          </div>
          <FormTextInput form={form} field="name" label="Titre" />
          <FormTextInput form={form} field="code" label="Code" />
          <AppTextarea form={form} />
        </CustomForm>
      </Modal>
      <TableActionItemFonction label={"Modifier"} onClick={open} />
    </>
  );
};
