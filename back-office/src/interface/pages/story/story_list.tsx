import { StoryCreate } from "./story_create";
import { storyApi } from "../../../core/features/story.slice";
import { StoryCardItem } from "./widget/story_card_item";

export const StoryList = () => {
const stories=storyApi.useGetAllQuery("")
  return (
    <div>
     <StoryCreate/>
       <div className="grid grid-cols-4 gap-3 ">
        {stories.data?.data.map(s=><StoryCardItem story={s}/>)}
       </div>
    </div>
  );
};
