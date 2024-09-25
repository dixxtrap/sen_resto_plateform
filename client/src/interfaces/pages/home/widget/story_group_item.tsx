import { Avatar, Text, Image, UnstyledButton, Box } from "@mantine/core";
import { StoryGroup } from "../../../../cores/models/story.dto";

export const StoryGroupItem = ({ storyGroup }: { storyGroup: StoryGroup }) => {
  return (
    <>
    <Box style={{
        backgroundSize: "200%",
        width: "100%",
        backgroundPosition: "center",
      backgroundImage:`url(${storyGroup.partner?.imagePath})`}} className=" rounded-full ring  flex h-full backdrop-blur-sm content-center bg-black/10  md:hidden">
        <div className="h-full w-full content-center backdrop-blur-md ring rounded-full p-3">
        <Image               className=" z-30 m-auto rounded-md  w-auto "
              src={storyGroup.partner?.imagePath}/>
        </div>
   
              </Box>
      <UnstyledButton
        component="div"
        p={0}
        style={{
          backgroundImage: `url(${storyGroup?.story![0].imagePath})`,
          backgroundSize: "200%",
          width: "100%",
          backgroundPosition: "center",
        }}
        display={{base:"none", sm:"block"}}
        className=" hidden md:block ring ring-gray-400 relative border-green-300 w-full h-[300px] bg-red-300  rounded-md     "
      >
        <div className="h-full   rounded-md w-full  content-center flex backdrop-blur-sm bg-black/10 ">
          <div className=" flex   justify-start  p-2 w-full">
            <div className="size-10">
            <Avatar
              radius={3}
              className=" z-30   h-auto w-full"
              src={storyGroup.partner?.imagePath}
            />
            </div>
            <div className="flex  flex-col pl-2  ">
              <Text className="leadind-3 font-bold">
                {storyGroup.partner?.shortname}
              </Text>
              <Text className="text-sm text-slate-700 line-clamp-3 leading-3">
                {storyGroup.partner?.name}
              </Text>
            </div>
          </div>
          <div className="grow"></div>
          <div className="absolute z-20  flex justify-center items-center h-full w-full ">
            <div className="mx-auto w-full  items-center justify-center ">
              <Image
                className="m-auto  w-full h-48"
                src={`${storyGroup?.story![0].imagePath}`}
              />
            </div>
          </div>
        </div>
      </UnstyledButton>
    </>
  );
};
