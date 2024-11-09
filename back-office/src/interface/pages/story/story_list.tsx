import { StoryCreate } from "./story_create";
import { storyApi } from "../../../core/features/story.slice";
import { StoryCardItem } from "./widget/story_card_item";
import { Title } from "@mantine/core";

export const StoryList = () => {
const stories=storyApi.useGetAllQuery("")
  return (
    <div><div className="flex justify-between">
      <Title >Stories</Title>
     <StoryCreate/>

    </div>
       <div className="grid grid-cols-4 gap-3 ">
        {stories.data?.data.map(s=><StoryCardItem story={s}/>)}
       </div>
    </div>
  );
};
