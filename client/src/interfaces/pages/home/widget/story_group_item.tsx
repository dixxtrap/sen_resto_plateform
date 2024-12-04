import {  Text, Image } from "@mantine/core";
import { StoryGroup } from "../../../../cores/models/story.dto";

export const StoryGroupItem = ({ storyGroup }: { storyGroup: StoryGroup }) => {
  return (
    <>
      <div className="content-center cursor-pointer flex items-center justify-center">
        <div className=" rounded-full ring-1 ring-inset size-10 flex items-center justify-center  backdrop-blur-sm content-center bg-slate-50  md:hidden">
          <Image
            fit="contain"
            className=" z-30 rounded-md  size-8  "
            src={storyGroup.partner?.imagePath}
          />
        </div>
      </div>

      <div className=" hidden cursor-pointer md:block ring-1 ring-slate-400 m-0.5 ring-inset relative border-green-300 w-full  bg-slate-50  rounded-md     ">
        <div className=" flex   justify-start  z-30  p-2 w-full">
          <Image
            radius={3}
            fit="cover"
            className=" z-30    size-8"
            src={storyGroup.partner?.imagePath}
          />

          <Text
            lineClamp={1}
            className=" line-clamp-1 ml-2 overflow-hidden  text-ellipsis font-bold"
          >
            {storyGroup.partner?.shortname}
          </Text>
        </div>

        <Image
          className="m-auto h-[144px]  rounded-b-md"
          src={`${storyGroup?.story![0].imagePath}`}
        />
      </div>
    </>
  );
};
