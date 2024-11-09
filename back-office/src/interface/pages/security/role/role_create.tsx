import { Textarea, TextInput, Modal, Button } from "@mantine/core";
import { useCreateRoleMutation } from "../../../../core/features/role.slice";
import { CustomForm } from "../../../components/custom_form";
import { useForm } from "@mantine/form";
import { TextConstant } from "../../../../core/data/textConstant";
import { useDisclosure } from "@mantine/hooks";
export const RoleCreate = ({ id }: { id: number }) => {
  const [opened, { open, close }] = useDisclosure();
  const [create, { isLoading, isSuccess, isError }] = useCreateRoleMutation();
  const form = useForm({});
  const _onsubmit = form.onSubmit((data) => {
    console.log(data);
    create({ ...data, parent: { id } });
  });
  return (
    <>
      <Modal
        size={"xl"}
        opened={opened}
        title={"Creer un nouveau sous role"}
        onClose={close}
      >
        <CustomForm
          onSubmit={_onsubmit}
          isError={isError}
          isSuccess={isSuccess}
          isLoading={isLoading}
        >
          <TextInput
            label={TextConstant.names}
            {...form.getInputProps("name")}
            error={form.errors["name"]}
            key={form.key("name")}
          />
          <TextInput
            label={"Code"}
            {...form.getInputProps("code")}
            error={form.errors["code"]}
            key={form.key("code")}
          />

          <Textarea
            classNames={{ input: "bgInput" }}
            label={TextConstant.description}
            {...form.getInputProps("description")}
            error={form.errors["description"]}
            key={form.key("description")}
          />
        </CustomForm>
      </Modal>
      <Button
        onClick={open}
        size="compact-sm"
        color="secondary.4"
        fw={400}
        className="  "
      >
        Ajouter Sous Role
      </Button>
    </>
  );
};
