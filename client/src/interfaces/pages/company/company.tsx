import { useParams } from "react-router-dom";
import { baseApi } from "../../../cores/apis/api";
import { HomeCompanyItem } from "../home/widget/home_company_item";
import { BackgroundImage, Image, Text } from "@mantine/core";
import { useEffect } from "react";
export const Company = () => {
  const { id } = useParams();
  const companyApi = baseApi.useGetEtsCompanyByIdQuery(id!);
  useEffect(() => {
    companyApi.refetch();
  }, [id]);

  return (
    <>
    <div className="p-2">
    <BackgroundImage
        className=" rounded-md"
        src={companyApi.data?.data.backgroundPath!}
      >
        <div className=" content-center h-[200px] md:h-[400px] relative    mb-12 md:mb-16 ">
          <div className=" text-center   ">
            <div className="max-w-3xl mx-auto"></div>
          </div>
          <div className="-bottom-10 absolute flex items-end gap-3 md:-bottom-12  left-2 md:left-8">
            <div className="md:size-24 size-20  bg-white rounded-full content-center ring p-4 ring-gray-500  ">
              <Image src={companyApi.data?.data.imagePath} className="" />
            </div>
            <Text className="font-serif md:text-3xl">
              {companyApi.data?.data.name}{" "}
            </Text>
          </div>
        </div>
      </BackgroundImage>
    </div>
     <div className="py-10  ">
     <div className="grid grid-cols-2   gap-5  md:gap-10  sm:grid-cols-2 px-4 md:grid-cols-3 lg:grid-cols-4">
        {companyApi.data?.data.company.map((e) => (
          <HomeCompanyItem key={`/company/details/${e.id}`} company={e} />
        ))}
      </div>
     </div>
     
    </>
  );
};
