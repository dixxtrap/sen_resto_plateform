import { Textarea, TextInput } from "@mantine/core";
import { useCreateRoleMutation } from "../../../../core/features/role.slice";
import { CustomForm } from "../../../components/custom_form";
import { useForm } from "@mantine/form";
import { useParams } from "react-router-dom";
import { TextConstant } from "../../../../core/data/textConstant";

export const RoleCreate = () => {
  const id = parseInt(useParams().id!);
  const [create, { isLoading, isSuccess, isError }] = useCreateRoleMutation();
  const form = useForm({  });
  const _onsubmit = form.onSubmit((data) => {
    console.log(data);
    create({ ...data, parent: { id } });
  });
  return (
    <CustomForm
      onSubmit={_onsubmit}
      isError={isError}
      isSuccess={isSuccess}
      isLoading={isLoading}
    >
     
      <TextInput label={TextConstant.name} {...form.getInputProps("name")} error={form.errors["name"]} key={form.key("name")} />
      <TextInput label={"Code"} {...form.getInputProps("code")} error={form.errors["code"]} key={form.key("code")} />

      
      <Textarea classNames={{input:'bgInput'}} label={TextConstant.description} {...form.getInputProps("description")} error={form.errors["description"]} key={form.key("description")} />

    </CustomForm>
  );
};
