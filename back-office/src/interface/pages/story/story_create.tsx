import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { StoryDropzone } from "./widget/story_dropzone";
import '@mantine/dropzone/styles.css';
export const StoryCreate = () => {
    const [opened, { close, open }] = useDisclosure();
    return (
        <>
         <Modal opened={opened} onClose={close}>
            <StoryDropzone/>
             </Modal>
          <Button onClick={open}>Ajouter</Button>
          </>
    )
}