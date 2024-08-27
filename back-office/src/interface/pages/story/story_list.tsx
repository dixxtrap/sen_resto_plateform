import { Button, Modal} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export const StoreList = () => {
  const [opened, { close, open }] = useDisclosure();
  return (
    <div>
      <Modal opened={opened} onClose={close}>Bonjour </Modal>
      <Button onClick={open}>Ajouter</Button>
    </div>
  );
};
