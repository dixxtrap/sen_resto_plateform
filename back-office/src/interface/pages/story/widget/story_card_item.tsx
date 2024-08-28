import { IconEye, IconMessageCircle, IconTrash } from '@tabler/icons-react';
import { Card, Text, Group, Center, rem, useMantineTheme, ActionIcon } from '@mantine/core';
import classes from '../styles/story_card_item.module.css';
import { StoryDto } from '../../../../core/models/story.dto';
import { storyApi } from '../../../../core/features/story.slice';

export const  StoryCardItem=({story}:{story:StoryDto}) =>{
  const theme = useMantineTheme();
const [del, delStatsu]=storyApi.useDeleteMutation();
const onDelete=()=>{
    del(`${story.id}`)
}
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
          backgroundImage:
            `url(${story.imagePath})`,
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

            <Group gap="lg">
              <Center>
                <ActionIcon onClick={onDelete} size={'md'}  color='red'>
               
               <IconTrash/>
                </ActionIcon>
              </Center>
           
            </Group>
          </Group>
        </div>
      </div>
    </Card>
  );
}