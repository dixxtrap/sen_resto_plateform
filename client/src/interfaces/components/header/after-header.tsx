import { Box, Image, Text } from "@mantine/core";
import { baseApi } from "../../../cores/apis/api";

import { Fetchingdata } from "../fetching_data";
import { Link } from "react-router-dom";

export const AfterHeader = () => {
  const { data, ...state } = baseApi.useGetEtsQuery();
  return (
    <Fetchingdata {...state}>
      <div className=" flex flex-col -mt-16 items-center pt-16 relative bg-[#ffc244]">
        <Text className="text-xl md:text-4xl  p-4">Bienvenu sur <span className="font-bold">{import.meta.env.VITE_APP_NAME}</span> </Text>
        <div className="  pb-20 md:pt-5 flex w-full items-start justify-center gap-2 md:gap-10 ">
          {data?.data.map((e) => (
            <Box component={Link} to={`/establishment/${e.id}`} className=" flex w-24  group items-center  daxx  flex-col ring-gray-300  ">
              <div className="w-auto egg border border-r-8 border-secondary-500/80  bg-white/90 p-3 backdrop-blur-lg">
                <Image className="size-10 md:size-14  transform transition-transform duration-500 ease-in-out group-hover:scale-125 m-2" src={e.imagePath!} />
              </div>
              <Text className="text-xs line-clamp-2   text-center md:text-base">{e.name}</Text>
            </Box>
          ))}
          
        </div>
        <div className="h-5 md:h-20 deco-top deco-bottom bg-white w-full"></div>
      </div>
    </Fetchingdata>
  );
};
