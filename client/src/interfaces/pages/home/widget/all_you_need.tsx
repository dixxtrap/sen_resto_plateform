import { baseApi } from "../../../../cores/apis/api";
import { Fetchingdata } from "../../../components/fetching_data";
import { Image } from "@mantine/core";
export const AllYouNeed = () => {
  const { data, ...dataState } = baseApi.useGetIconQuery();
  return (
    <Fetchingdata {...dataState}>
      <div className="flex flex-col items-center max-w-4xl md:pt-8 w-full mx-auto justify-center">
        <g className="font-bold  md:text-3xl">Ce que résout notre plateforme</g>
        <g className="p-2 text-center md:text-base text-sm">
          Découvrez les 6 fonctionnalités clés de notre plateforme et comment
          elles répondent efficacement à vos besoins.
        </g>
        <div className="md:h-5 h-6"></div>
        <div className="grid grid-cols-2  md:grid-cols-3 gap-6 items-stretch  ">
          {data?.data.filter(e=>e.code.startsWith('AYK_')).map((e) => (
            <div className="flex flex-col items-center p-2 text-center gap-3 md:py-10 rounded-lg bg-white ring-gray-400 ring-inset justify-start ring-1 ">
              <Image fit="contain" className="md:size-14 size-10 " src={e.imagePath} />
              <g className="font-bold text-sm md:text-base">{e.name}</g>
              <p className="font-serif hidden md:block leading-8">{e.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Fetchingdata>
  );
};
