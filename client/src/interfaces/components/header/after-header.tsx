import { Box, Image, Text } from "@mantine/core";
import { baseApi } from "../../../cores/apis/api";

import { Fetchingdata } from "../fetching_data";
import { Link } from "react-router-dom";

export const AfterHeader = () => {
  const { data, ...state } = baseApi.useGetEtsQuery();
  return (
    <Fetchingdata {...state}>
      <div className=" flex flex-col m-3 rounded-md md:pt-10  items-center bg-gradient-to-tr relative to-amber-500 via-amber-400 from-amber-300 ">
        <Text className="text-xl md:text-4xl  p-4">Bienvenu sur <span className="font-bold">{import.meta.env.VITE_APP_NAME}</span> </Text>
        <div className="pb-4  md:pb-20 md:pt-5 flex w-full items-start justify-center gap-4 md:gap-10 ">
          {data?.data.map((e) => (
            <Box component={Link} to={`/establishment/${e.id}`} className=" flex   group items-center    flex-col ring-gray-300  ">
              <div className="w-auto egg border border-r-4 md:border-r-8 border-green-500/80 px-2  bg-white/90  size-14 sm:size-16 md:size-24 content-center backdrop-blur-lg">
                <Image className="size-8 md:size-14  transform transition-transform duration-500 mx-auto ease-in-out group-hover:scale-125 m-2" src={e.imagePath!} />
              </div>
              <Text className="text-xs line-clamp-2  mt-2  text-center md:text-base">{e.name}</Text>
            </Box>
          ))}
          
        </div>
        
      </div>
    </Fetchingdata>
  );
};
