import {
  IconEye,
  IconInfoCircle,
  IconInfoCircleFilled,
  IconMessageCircle,
  IconTrash,
} from "@tabler/icons-react";
import {
  Card,
  Text,
  Group,
  Center,
  rem,
  useMantineTheme,
  ActionIcon,
  Modal,
  Button,
  Alert,
  Box,
  LoadingOverlay,
} from "@mantine/core";
import classes from "../styles/story_card_item.module.css";
import { StoryDto } from "../../../../core/models/story.dto";
import { storyApi } from "../../../../core/features/story.slice";
import { useDisclosure } from "@mantine/hooks";

export const StoryCardItem = ({ story }: { story: StoryDto }) => {
  const theme = useMantineTheme();
  const [del, delStatsu] = storyApi.useDeleteMutation();
  const [opened, { close, open }] = useDisclosure();
  const onDelete = async () => {
    try {
      await del(`${story.id}`).unwrap();
      close();
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    } finally {
    }
  };
  return (
    <Card
      key={story.imagePath}
      p="lg"
      shadow="lg"
      className={classes.card}
      radius="md"
    >
      <div
        className={classes.image}
        style={{
          backgroundImage: `url(${story.imagePath})`,
        }}
      />
      <div className={classes.overlay} />

      <div className={classes.content}>
        <div>
          <Text size="lg" className={classes.title} fw={500}>
            Journey to Swiss Alps
          </Text>

          <Group justify="space-between" gap="xs">
            <Text size="sm" className={classes.author}>
              Robert Gluesticker
            </Text>
            <Modal opened={opened} onClose={close}>
        
                  <LoadingOverlay
                    visible={delStatsu.isLoading}
                    zIndex={1000}
                    overlayProps={{ radius: "sm", blur: 2 }}
                    loaderProps={{ color: "pink", type: "bars" }}
                  />
              <Alert
                variant="light"
                color="blue"
                title="Suppression"
                icon={<IconInfoCircleFilled />}
              >
                Voulez-Vous supprimer le storie {story.id} ?
              </Alert>

              <Group justify="center" gap="md" style={{ marginTop: '20px' }}>
             
                <Button onClick={onDelete}  color="green" disabled={delStatsu.isLoading}>
                  Valider
                  </Button>
                <Button color="red" onClick={close}>
                  Annuler
                </Button>
              </Group>
            </Modal>

            <Group gap="lg">
              <Center>
                <ActionIcon onClick={open} size={"md"} color="red">
                  <IconTrash />
                </ActionIcon>
              </Center>
            </Group>
          </Group>
        </div>
      </div>
    </Card>
  );
};
