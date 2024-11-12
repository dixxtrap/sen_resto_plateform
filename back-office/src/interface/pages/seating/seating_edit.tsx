import { Modal, TextInput, Select, ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { CustomForm } from "../../components/custom_form";
import { seatingApi } from "../../../core/features/seating.slice";
import { useForm } from "@mantine/form";
import { shopApi } from "../../../core/features/shop.slice";
import { Seatingto } from "../../../core/models/seating.dto";
import { IconPencil } from "@tabler/icons-react";
import { CustomSwitchInput } from "../../components/switch";

export const SeatingEdit = (props: Seatingto) => {
    const shop = shopApi.useGetShopQuery("");
  const [opened, { open, close }] = useDisclosure();
  const [create, createState] = seatingApi.useUpdateMutation();
  const form = useForm<Seatingto>({
    initialValues: {
      name: props.name,
      capacity: props.capacity,
      isActive: props.isActive,
      shopId: `${props.shopId}` ,
    }
  });
  const _onSubmit = form.onSubmit((data) => {
    create({ id: props.id!, body: data });
  });
  return (
    <>
      <Modal
        title={<span>Modifier la table</span>}
        onClose={close}
        opened={opened}
      >
        <CustomForm successPath="." onSubmit={_onSubmit} {...createState}>
          <TextInput
            label="Label"
            {...form.getInputProps("name")}
            key={form.key("name")}
            error={form.errors["name"]}
          />
          <TextInput
            label={"capacité"}
            {...form.getInputProps("capacity")}
            key={form.key("capacity")}
            error={form.errors["capacity"]}
          />
          <Select
            label="Shop"
            {...form.getInputProps("shopId")}
            key={form.key("shopId")}
            error={form.errors["shopId"]}
            data={shop.data?.data.map((e) => ({
              label: e.name!,
              value: `${e.id}`,
            }))}
            
          />
          <CustomSwitchInput itemKey={"isActive"} form={form} />
        </CustomForm>
      </Modal>
      <ActionIcon onClick={open}>
        <IconPencil />
      </ActionIcon>
    </>
  );
};
