import {   Image } from "@mantine/core";
import { StoryGroup } from "../../../../cores/models/story.dto";

export const StoryGroupItem = ({ storyGroup }: { storyGroup: StoryGroup }) => {
  return (
    <>
      <div className="content-center cursor-pointer flex items-center justify-center">
        <div className=" rounded-full ring-1 ring-inset size-14 flex p-1 items-center justify-center  backdrop-blur-sm content-center bg-slate-100  md:hidden">
          <Image
            fit="contain"
            className=" z-30 rounded-md  size-[39px]  "
            src={storyGroup.partner?.imagePath}
          />
        </div>
      </div>

      <div className=" hidden cursor-pointer md:block ring-1 ring-black/80 m-0.5  relative w-full  bg-slate-50  rounded-md     ">
        <div className=" flex absolute  ring ring-slate-500 bg-white dark:bg-black/60 rounded-full justify-start backdrop-blur-lgz-30 m-1.5   p-1.5 ">
          <Image
            radius={3}
            fit="contain"
            className=" z-30   size-8"
            src={storyGroup.partner?.imagePath}
          />

       
        </div>

        <Image
          className="m-auto h-[184px]  rounded-md"
          src={`${storyGroup?.story![0].imagePath}`}
        />
      </div>
    </>
  );
};
