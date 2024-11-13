import { Modal, Text, Button } from "@mantine/core";
import { TableActionItemFonction } from "../../../components/table/action_item";
import { DeliverDto } from "../../../../core/models/deliver.dto";
import { useDisclosure } from "@mantine/hooks";
import { IconLockAccess } from "@tabler/icons-react";

export const DeliverResendCode = ({ deliver }: { deliver: DeliverDto }) => {
  const [opened, { open, close }] = useDisclosure();
  return (
    <>
      <Modal
        classNames={{ title: "font-bold text-xl" }}
        title="Confirmer le renvoi du code"
        opened={opened}
        onClose={close}
      >
        <Text>
          Êtes-vous sûr de vouloir renvoyer le code d'accès au livreur ? Cette
          action enverra un nouveau code à {deliver.displayname}{" "}
           / {deliver.phone}.
        </Text>
        <div className="flex justify-between">
          <Button>Annuler</Button>
          <Button color={"primary"}>Confirmer</Button>
        </div>
      </Modal>

      <TableActionItemFonction
        onClick={open}
        icon={<IconLockAccess />}
        label={"renvoyer code"}
      />
    </>
  );
};
