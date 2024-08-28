import { useState } from 'react';
import { Text, Image, SimpleGrid, Button } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';
import { storyApi } from '../../../../core/features/story.slice';

export const StoryDropzone= ()=> {
  const [files, setFiles] = useState<File[]>([]);
const [createStory, createStoryState]=storyApi.useCreateMutation()
  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return <Image key={index} src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />;
  });
const _onSubmit=()=>{
    console.log(files)
    const formData = new FormData();

    // Append files to FormData
    files.forEach((file, i) => {
      formData.append(`file`, file);
    });
    console.log(formData)
    createStory(formData)
}
  return (
    <div>
        {createStoryState.isLoading&&<span>loading</span>}
        {createStoryState.isSuccess&&<span>Succees</span>}
        {createStoryState.isError&&<span>error</span>}
      <Dropzone accept={IMAGE_MIME_TYPE} onDrop={setFiles}>
        <Text ta="center">Drop images here</Text>
      </Dropzone>

      <SimpleGrid cols={{ base: 1, sm: 4 }} mt={previews.length > 0 ? 'xl' : 0}>
        {previews}
      </SimpleGrid>
    { files.length>0&& <Button onClick={_onSubmit} > Valider</Button>}
    </div>
  );
}