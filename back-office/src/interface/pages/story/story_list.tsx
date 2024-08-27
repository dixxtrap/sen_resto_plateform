import { Badge, Button, Card, Group, Modal,Text} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export const StoreList = () => {
  const [opened, { close, open }] = useDisclosure();
  return (
    <div>
      <Modal opened={opened} onClose={close}>Bonjour </Modal>
          <Button onClick={open}>Ajouter</Button>
          
          <Card shadow="sm" padding="lg" radius="md" withBorder>
    

      <Text size="sm" c="dimmed">
        With Fjord Tours you can explore more of the magical fjord landscapes with tours and
        activities on and around the fjords of Norway
      </Text>

      <Button color="blue" fullWidth mt="md" radius="md">
        Book classic tour now
      </Button>
    </Card>
    </div>
  );
};
